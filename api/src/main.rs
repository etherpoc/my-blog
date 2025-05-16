use dotenv;
use actix_web::{ App, HttpServer, web };
use sqlx::postgres::PgPoolOptions;

mod routes;
mod types;
mod database;
mod error;
mod extractors;
mod middlewares;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    let database_url = database::database::DATABASECONFIG.database_url();
    let pg_pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("database connect error");
    sqlx::migrate!().run(&pg_pool).await.expect("database migrate error");

    let config = types::Config::default();
    let auth0_config = extractors::Auth0Config::default();
    HttpServer::new(move || {
        App::new()
            .wrap(middlewares::cors::cors(&config.admin_origin_url, &config.client_origin_url))
            .app_data(web::Data::new(pg_pool.clone()))
            .app_data(auth0_config.clone())
            .configure(routes::routes)
    })
    .bind(("127.0.0.1", config.port))?
    .run()
    .await
}
