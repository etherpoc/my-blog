use super::articles;

use actix_web::web;

pub fn routes(cfg: &mut web::ServiceConfig){
  cfg.service(
    web::scope("articles")
    .configure(articles::routes)
  );
}