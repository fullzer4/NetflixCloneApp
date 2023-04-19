use actix_web::{get, post, HttpResponse, Responder, web, error};
use serde::Deserialize;
use sqlx::{postgres::PgPool};
use bcrypt::{verify,hash};

async fn create_table(pool: &PgPool) -> Result<(), sqlx::Error> {
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS usuario (
            id SERIAL PRIMARY KEY,
            username TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )"
    )
    .execute(pool)
    .await?;

    let password = "DemoDemo";
    let hashed_password = hash(password, 10).unwrap();

    sqlx::query!(
        "INSERT INTO usuario (username, email, password)
            VALUES ($1, $2, $3)
            ON CONFLICT (email) DO UPDATE SET username = excluded.username",
        "demo",
        "Demo@gmail.com",
        hashed_password,
    )
    .execute(pool)
    .await?;

    Ok(())
}

#[derive(sqlx::FromRow, serde::Serialize)]
struct User {
    id: i32,
    username: String,
    email: String,
    password: String,
}

#[get("/")]
pub async fn greet() -> impl Responder {
    HttpResponse::Ok().body("See the docs to see how to consume!")
}

#[derive(Deserialize, Clone)]
pub struct LoginInfo {
    email: String,
    password: String,
}

async fn create_pool() -> PgPool {
    let database_url = "postgres://postgres:123456@localhost/netflix";
    let pool = PgPool::connect(database_url).await.unwrap();

    create_table(&pool).await.unwrap();

    pool
}

#[post("/login")]
pub async fn login(info: web::Json<LoginInfo>) -> Result<HttpResponse, actix_web::Error> {
    let pool = create_pool().await;

    let email = info.email.clone();
    let password = info.password.clone();

    if email.is_empty() || password.is_empty() {
        return Err(error::ErrorBadRequest("verify all the request"));
    }

    let user = match sqlx::query_as::<_, User>(
        "SELECT * FROM usuario WHERE email = $1"
    )
    .bind(&email)
    .fetch_optional(&pool)
    .await {
        Ok(user) => user,
        Err(e) => {
            return Err(actix_web::error::ErrorInternalServerError(e));
        }
    };

    if let Some(user) = user {
        if verify(&password, &user.password).unwrap_or(false) {
            Ok(HttpResponse::Ok().json(user))
        } else {
            Err(error::ErrorUnauthorized("invalid email or password"))
        }
    } else {
        Err(error::ErrorNotFound("user with email not found"))
    }
}

#[derive(Deserialize, Clone)]
pub struct SignUpInfo {
    username: String,
    email: String,
    password: String,
}

#[post("/signup")]
pub async fn signup(info: web::Json<SignUpInfo>) -> Result<HttpResponse, actix_web::Error> {

    let username = info.username.clone();
    let email = info.email.clone();
    let password = info.password.clone();

    if username.is_empty() || email.is_empty() || password.is_empty() {
        return Err(error::ErrorBadRequest("verify all the request"));
    }

    let pool = create_pool().await;

    let user = match sqlx::query_as::<_, User>(
        "SELECT * FROM usuario WHERE email = $1"
    )
    .bind(&email)
    .fetch_optional(&pool)
    .await {
        Ok(user) => user,
        Err(e) => {
            return Err(actix_web::error::ErrorInternalServerError(e));
        }
    };

    if user.is_some() {
        return Err(error::ErrorConflict("user with email already exists"));
    }

    let hashed_password = hash(&password, 10).unwrap();

    match sqlx::query!(
        "INSERT INTO usuario (username, email, password) VALUES ($1, $2, $3)",
        &username,
        &email,
        hashed_password,
    )
    .execute(&pool)
    .await {
        Ok(_) => Ok(HttpResponse::Ok().finish()),
        Err(e) => Err(actix_web::error::ErrorInternalServerError(e)),
    }
}

async fn verify_user(email: &str, pool: &PgPool) -> Result<bool, sqlx::Error> {
    let user = sqlx::query_as::<_, User>(
        "SELECT * FROM usuario WHERE email = $1"
    )
    .bind(email)
    .fetch_optional(pool)
    .await?;

    Ok(user.is_some())
}

#[get("/verifyuser/{email}")]
pub async fn verifyuser(path: web::Path<(String,)>) -> Result<HttpResponse, actix_web::Error> {
    let email = &path.0;

    let pool = create_pool().await;

    if let Some(exists) = verify_user(&email, &pool).await.ok() {
        Ok(HttpResponse::Ok().json(exists))
    } else {
        Err(actix_web::error::ErrorInternalServerError("Error checking user existence"))
    }
}