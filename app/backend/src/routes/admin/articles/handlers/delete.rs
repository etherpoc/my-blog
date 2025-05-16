use actix_web::{ delete, web, Responder };
use std::collections::HashSet;
use sqlx::PgPool;
use crate::extractors::Claims;
use crate::{error::MyError, types::ResponseBody};
use crate::database::models::Article;

#[delete("/delete/{id}")]
pub async fn delete(
    claims: Claims,
    pool: web::Data<PgPool>,
    id: web::Path<i32>
) -> impl Responder {
    println!("Call ADMIN_DELETE_ARTICLE");
    if claims.validate_permissions(&HashSet::from(["admin".to_string()])) {

        let deleted_article = Article::delete(pool.get_ref().clone(), *id).await;
        match deleted_article {
            Ok(_)=>
                Ok(web::Json(ResponseBody::new("Delete article complete", {}))),
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