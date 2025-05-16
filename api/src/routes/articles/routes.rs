use super::handler;

use actix_web::web;

pub fn routes(cfg: &mut web::ServiceConfig){
  cfg.service(handler::get_all_articles)
  .service(handler::get_recent_posts)
  .service(handler::get_all_tags)
  .service(handler::get_article); 
}