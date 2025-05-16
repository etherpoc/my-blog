use actix_web::web;
use super::handlers;

pub fn routes(cfg: &mut web::ServiceConfig){
  cfg.service(handlers::index::index)
  .service(handlers::all::all)
  .service(handlers::recent::recent)
  .service(handlers::detail::detail)
  .service(handlers::tags::tags);
}