use actix_web::{get, post, HttpResponse, Responder, web, error};
use serde::Deserialize;
use sqlx::{postgres::PgPool, Pool, Postgres};

async fn create_table(pool: &PgPool) -> Result<(), sqlx::Error> {
    sqlx::query(
    "CREATE TABLE IF NOT EXISTS usuario (
            id SERIAL PRIMARY KEY,
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )"
    )
    .execute(pool)
    .await?;

    Ok(())
}

async fn connection() -> PgPool {
    let database_url:&str = "postgres://postgres:123456@localhost/netflix";
    let pool: Pool<Postgres> = PgPool::connect(database_url).await.unwrap();
    
    create_table(&pool).await.unwrap();
    
    pool
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

#[post("/login")]
pub async fn login(info: web::Json<LoginInfo>) -> Result<HttpResponse, actix_web::Error> {

    let email: Option<String> = Some(info.email.clone());
    let password: Option<String> = Some(info.password.clone());

    let _pool: Pool<Postgres> = connection().await;

    println!("Conectado");

    if email.is_none() || password.is_none() {
        return Err(error::ErrorBadRequest("verify all the request"));
    }

    Ok(HttpResponse::Ok().json(email))
}

#[derive(Deserialize, Clone)]
pub struct SignUpInfo {
    username: String,
    email: String,
    password: String,
}

#[post("/signup")]
pub async fn signup(info: web::Json<SignUpInfo>) -> Result<HttpResponse, actix_web::Error> {

    let username: Option<String> = Some(info.username.clone());
    let email: Option<String> = Some(info.email.clone());
    let password: Option<String> = Some(info.password.clone());

    let _pool: Pool<Postgres> = connection().await;

    if username.is_none() || email.is_none() || password.is_none() {
        return Err(error::ErrorBadRequest("verify all the request"));
    }

    Ok(HttpResponse::Ok().json(email))
}