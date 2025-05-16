use actix_web::{ get, web, Responder, HttpRequest };
use serde_json::json;
use sqlx::PgPool;
use crate::error::MyError;
use crate::types::ResponseBody;
use crate::database::models::Article;

#[get("/tags")]
pub async fn tags(
    pool: web::Data<PgPool>,
    _req: HttpRequest
) -> impl Responder {
    println!("Call GET_ALL_TAGS");
    
    let all_tags = Article::get_all_tags(pool.get_ref().clone(), true).await;

    match all_tags {
      Ok(tags) => {
          let res = json!({
              "tags": tags
          });
          Ok(web::Json(ResponseBody::new("Completed", res)))
      }
      Err(err) => {
          eprintln!("{:?}", err);
          Err(MyError::InternalError)
      }
  }
}
