use actix_web::{ HttpServer, App };
use actix_cors::Cors;
mod method;
use method::{greet, login, signup, verifyuser};

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    std::env::set_var("RUST_LOG", "actix_web=debug");

    HttpServer::new(|| {
        let _cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();
        App::new()
            .service(greet)
            .service(login)
            .service(signup)
            .service(verifyuser)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}