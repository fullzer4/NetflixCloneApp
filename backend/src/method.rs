use actix_web::{get, post, HttpResponse, Responder, web};
use serde::de;

#[get("/")]
pub async fn greet() -> impl Responder {
    HttpResponse::Ok().body("See the docs to see how to consume!")
}

#[post("/login")]
pub async fn login(info: web::ReqData<LoginInfo>) -> impl Responder {
    HttpResponse::Ok().body("See the docs to see how to consume!")
}

#[derive(Clone, )]
pub struct LoginInfo {
    email: String,
    password: i32,
}