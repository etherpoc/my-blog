use actix_web::{ App, HttpServer, web };
use sqlx::postgres::PgPoolOptions;

mod routes;
mod types;
mod database;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect("postgres://admin:password@localhost:5432/blog")
        .await
        .expect("database connect error");
    sqlx::migrate!().run(&pool).await.expect("database migrate error");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .configure(routes::routes)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
