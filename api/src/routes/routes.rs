use super::index;
use super::admin;
use super::articles;

use actix_web::web;

pub fn routes(cfg: &mut web::ServiceConfig){
  cfg.service(index::index);
  cfg.service(
    web::scope("admin")
    .configure(admin::routes)
  );
  cfg.service(
    web::scope("articles")
    .configure(articles::routes)
  );
}