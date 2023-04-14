use actix_web::{get, HttpServer, App, HttpResponse, Responder};

#[get("/")]
async fn greet() -> impl Responder {
    HttpResponse::Ok().body("See the docs to see how to consume!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(greet)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}