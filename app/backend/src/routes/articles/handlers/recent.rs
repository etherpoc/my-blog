use actix_web::{ get, web, Responder, HttpRequest };
use serde_json::json;
use sqlx::PgPool;
use crate::error::MyError;
use crate::types::ResponseBody;
use crate::database::models::Article;

#[get("/recent")]
pub async fn recent(
    pool: web::Data<PgPool>,
    _req: HttpRequest
) -> impl Responder {
    println!("Call GET_RECENT_POST");

    let recent_articles = Article::get_recent_posts(pool.get_ref().clone(), true, 6).await;

    match recent_articles {
        Ok(articles) => {
            let res = json!({
                "articles": articles
            });
            Ok(web::Json(ResponseBody::new("Completed", res)))
        }
        Err(err) => {
            eprintln!("{:?}", err);
            Err(MyError::InternalError)
        }
    }
}
