use actix_web::{ post, web, Responder };
use serde::Deserialize;
use std::collections::HashSet;
use sqlx::PgPool;
use crate::extractors::Claims;
use crate::{error::MyError, types::ResponseBody};
use crate::database::models::Article;

#[derive(Debug, Deserialize)]
pub struct CreateArticle {
    pub title: String,
    pub img_url: Option<String>,
    pub tags: Vec<String>,
    pub content: String,
}

#[post("/create")]
pub async fn create(
    claims: Claims,
    pool: web::Data<PgPool>,
    form_data: web::Json<CreateArticle>
) -> impl Responder {
    println!("Call ADMIN_CREATE_ARTICLE");
    if claims.validate_permissions(&HashSet::from(["admin".to_string()])) {

        let form_data = form_data.into_inner();
        let created_article = Article::insert(
            pool.get_ref().clone(),
            form_data.title,
            form_data.img_url,
            form_data.tags,
            form_data.content).await;
        
        match created_article {
            Ok(_) => 
                Ok(web::Json(ResponseBody::new("Create article complete", {}))),
            Err(err) => {
                eprintln!("{:?}", err);
                Err(MyError::InternalError)
            }
        }
    }
    else {
        Err(MyError::Forbidden)
    }
}