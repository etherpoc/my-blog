use actix_web::{ get, web, Responder};
use std::collections::HashSet;
use serde_json::json;
use sqlx::PgPool;
use crate::extractors::Claims;
use crate::{error::MyError, types::ResponseBody};
use crate::database::models::Article;

#[get("/detail/{id}")]
pub async fn detail(
    claims: Claims,
    pool: web::Data<PgPool>,
    id: web::Path<i32>
) -> impl Responder {
    println!("Call ADMIN_GET_ARTICLE");
    if claims.validate_permissions(&HashSet::from(["admin".to_string()])) {
        let article = Article::get_by_id(pool.get_ref().clone(), false, *id).await;
        
        match article {
            Ok(article)=>{
              let res = json!({ "article": article });
              Ok(web::Json(ResponseBody::new("Get article complete", res)))
            }
            Err(err)=>{
              eprintln!("{:?}", err);
              Err(MyError::InternalError)
            }
        }
    }
    else {
        Err(MyError::Forbidden)
    }
}