use actix_cors::Cors;
use actix_web::http::{header, Method};

pub fn cors(admin_origin_url: &str, client_origin_url: &str) -> Cors {
    Cors::default()
        .allowed_origin(admin_origin_url)
        .allowed_origin(client_origin_url)
        .allowed_methods([Method::GET, Method::POST, Method::PATCH, Method::DELETE])
        .allowed_headers([header::AUTHORIZATION, header::CONTENT_TYPE])
        .max_age(86_400)
}