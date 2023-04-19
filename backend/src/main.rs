use actix_web::{ HttpServer, App };

mod method;
use method::{greet, login, signup, verifyuser};

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    std::env::set_var("RUST_LOG", "actix_web=debug");

    HttpServer::new(|| {
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