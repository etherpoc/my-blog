use std::collections::HashSet;

use actix_web::{ get, post, patch, delete, web, Responder};
use sqlx::PgPool;
use crate::extractors::Claims;
use crate::{error::MyError, types::ResponseBody};
use crate::database::models::Article;
use super::types::{ CreateArticle, UpdateArticle };

#[get("/")]
pub async fn get_all_articles(
  claims: Claims,
  pool: web::Data<PgPool>
) -> impl Responder {
    println!("Call ADMIN_GET_ALL_ARTICLES");
    if claims.validate_permissions(&HashSet::from(["admin".to_string()])) {
        let articles = Article::get_all(pool.get_ref().clone(), false).await;

        match articles {
            Ok(x)
                => Ok(web::Json(ResponseBody::new("Get all article complete", x))),
            Err(_err)
                => Err(MyError::InternalError)
        }
    }
    else {
        Err(MyError::Forbidden)
    }
}

#[get("/{id}/")]
pub async fn get_article(
    claims: Claims,
    pool: web::Data<PgPool>,
    id: web::Path<i32>
) -> impl Responder {
    println!("Call ADMIN_GET_ARTICLE");
    if claims.validate_permissions(&HashSet::from(["admin".to_string()])) {
        let article = Article::get_by_id(pool.get_ref().clone(), false, *id).await;

        match article {
            Ok(x)
                => Ok(web::Json(ResponseBody::new("Get article complete", x))),
            Err(_err)
                => Err(MyError::InternalError)
        }
    }
    else {
        Err(MyError::Forbidden)
    }
}

#[post("/")]
pub async fn create_article(
    claims: Claims,
    pool: web::Data<PgPool>,
    form_data: web::Json<CreateArticle>
) -> impl Responder {
    println!("Call ADMIN_CREATE_ARTICLE");
    if claims.validate_permissions(&HashSet::from(["admin".to_string()])) {
        let created_article = Article::insert(
            pool.get_ref().clone(),
            form_data.title.clone(),
            form_data.img_url.clone(),
            form_data.tags.clone(),
            form_data.content.clone()).await;

        match created_article {
            Ok(_x)
                => Ok(web::Json(ResponseBody::new("Create article complete", {}))),
            Err(_err)
                => Err(MyError::InternalError)
        }
    }
    else {
        Err(MyError::Forbidden)
    }
}

#[patch("/{id}/")]
pub async fn update_article(
    claims: Claims,
    pool: web::Data<PgPool>,
    id: web::Path<i32>,
    form_data: web::Json<UpdateArticle>
) -> impl Responder {
    println!("Call ADMIN_UPDATE_ARTICLE");
    if claims.validate_permissions(&HashSet::from(["admin".to_string()])) {
        let updated_article = Article::update(
            pool.get_ref().clone(),
            *id,
            form_data.title.clone(),
            form_data.img_url.clone(),
            form_data.tags.clone(),
            form_data.content.clone(),
            form_data.visibility.clone()).await;
        
        match updated_article {
            Ok(_x)
                => Ok(web::Json(ResponseBody::new("Update article complete", {}))),
            Err(err)
                => {
                    println!("{:?}", err);
                    Err(MyError::InternalError)
                }
        }
    }
    else {
        Err(MyError::Forbidden)
    }
}

#[delete("/{id}/")]
pub async fn delete_article(
    claims: Claims,
    pool: web::Data<PgPool>,
    id: web::Path<i32>
) -> impl Responder {
    println!("Call ADMIN_DELETE_ARTICLE");
    if claims.validate_permissions(&HashSet::from(["admin".to_string()])) {
        let deleted_article = Article::delete(pool.get_ref().clone(), *id).await;
        match deleted_article {
            Ok(_x)
                => Ok(web::Json(ResponseBody::new("Delete article complete", {}))),
            Err(_err)
                => Err(MyError::InternalError)
        }
    }
    else {
        Err(MyError::Forbidden)
    }
}