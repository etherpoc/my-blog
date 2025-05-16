use actix_web::{get, web, Responder, HttpRequest};
use serde_json::json;
use sqlx::PgPool;
use crate::error::MyError;
use crate::types::ResponseBody;
use crate::database::models::Article;

#[get("/detail/{id}")]
pub async fn detail(
    pool: web::Data<PgPool>,
    _req: HttpRequest,
    id: web::Path<i32>,
) -> impl Responder {
    println!("Call GET_ARTICLE");

    let article = Article::get_by_id(pool.get_ref().clone(), true, *id).await;

    match article {
        Ok(article) => {
            let res = json!({ "article": article });
            Ok(web::Json(ResponseBody::new("Completed", res)))
        }
        Err(err) => {
            eprintln!("{:?}", err);
            Err(MyError::InternalError)
        }
    }
}
