use super::handler;

use actix_web::web;


pub fn routes(cfg: &mut web::ServiceConfig){
  cfg.service(handler::get_all_articles)
  .service(handler::get_article)
  .service(handler::create_article)
  .service(handler::update_article)
  .service(handler::delete_article);
}