use actix_web::web;
use super::handlers;

pub fn routes(cfg: &mut web::ServiceConfig){
  cfg.service(handlers::index::index)
  .service(handlers::all::all)
  .service(handlers::detail::detail)
  .service(handlers::create::create)
  .service(handlers::update::update)
  .service(handlers::delete::delete);
}