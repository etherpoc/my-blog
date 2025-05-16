use actix_web::{ patch, web, Responder};
use serde::Deserialize;
use std::collections::HashSet;
use sqlx::PgPool;
use crate::extractors::Claims;
use crate::{error::MyError, types::ResponseBody};
use crate::database::models::Article;

#[derive(Debug, Deserialize)]
pub struct UpdateArticle {
    pub title: String,
    pub img_url: Option<String>,
    pub tags: Vec<String>,
    pub visibility: bool,
    pub content: Option<String>,
}

#[patch("/update/{id}")]
pub async fn update(
    claims: Claims,
    pool: web::Data<PgPool>,
    id: web::Path<i32>,
    form_data: web::Json<UpdateArticle>
) -> impl Responder {
    println!("Call ADMIN_UPDATE_ARTICLE");
    if claims.validate_permissions(&HashSet::from(["admin".to_string()])) {
        
        let form_data = form_data.into_inner();
        let updated_article = Article::update(
            pool.get_ref().clone(),
            *id,
            form_data.title,
            form_data.img_url,
            form_data.tags,
            form_data.content,
            form_data.visibility).await;
        
        match updated_article {
          Ok(_)=>
            Ok(web::Json(ResponseBody::new("Update article complete", {}))),
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