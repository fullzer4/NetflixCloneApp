use actix_web::{get, post, HttpResponse, Responder, web, error};
use serde::Deserialize;

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
pub async fn login(info: web::Query<LoginInfo>) -> Result<HttpResponse, actix_web::Error> {

    let email: Option<String> = Some(info.email.clone());
    let password: Option<String> = Some(info.password.clone());

    if email.is_none() || password.is_none() {
        return Err(error::ErrorBadRequest("verify all the request"));
    }

    Ok(HttpResponse::Ok().json(email))
}
