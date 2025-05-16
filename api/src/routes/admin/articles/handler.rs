use actix_web::{ get, post, patch, delete, web, Responder};
use sqlx::PgPool;
use crate::types::ResponseBody;
use crate::database::models::Article;
use super::types::{ CreateArticle, UpdateArticle };

#[get("/")]
pub async fn get_all_articles(
  pool: web::Data<PgPool>,
) -> impl Responder {
    let articles = Article::get_all(pool.get_ref().clone(), false).await;

    match articles {
        Ok(x)
            => web::Either::Left(web::Json(ResponseBody::new("Completed", x))),
        Err(err)
            => web::Either::Right(web::Json(ResponseBody::new("Database Error", format!("{:?}", err))))
    }
}

#[get("/{id}/")]
pub async fn get_article(
    pool: web::Data<PgPool>,
    id: web::Path<i32>
) -> impl Responder {
    let article = Article::get_by_id(pool.get_ref().clone(), false, *id).await;

    match article {
        Ok(x)
            => web::Either::Left(web::Json(ResponseBody::new("Completed", x))),
        Err(err)
            => web::Either::Right(web::Json(ResponseBody::new("Database Error", format!("{:?}", err))))
    }
}

#[post("/")]
pub async fn create_article(
    pool: web::Data<PgPool>,
    form_data: web::Json<CreateArticle>
) -> impl Responder {
    let created_article = Article::insert(
        pool.get_ref().clone(),
        form_data.title.clone(),
        form_data.img_url.clone(),
        form_data.tags.clone(),
        form_data.content.clone()).await;

    match created_article {
        Ok(x)
            => web::Either::Left(web::Json(ResponseBody::new("Completed", x))),
        Err(err)
            => web::Either::Right(web::Json(ResponseBody::new("Database Error", format!("{:?}", err))))
    }
}

#[patch("/{id}/")]
pub async fn update_article(
    pool: web::Data<PgPool>,
    id: web::Path<i32>,
    form_data: web::Json<UpdateArticle>
) -> impl Responder {
    let updated_article = Article::update(
        pool.get_ref().clone(),
        *id,
        form_data.title.clone(),
        form_data.img_url.clone(),
        form_data.tags.clone(),
        form_data.content.clone(),
        form_data.visibility.clone()).await;
    
    match updated_article {
        Ok(x)
            => web::Either::Left(web::Json(ResponseBody::new("Completed", x))),
        Err(err)
            => web::Either::Right(web::Json(ResponseBody::new("Database Error", format!("{:?}", err))))
    }
}

#[delete("/{id}/")]
pub async fn delete_article(
    pool: web::Data<PgPool>,
    id: web::Path<i32>
) -> impl Responder {
    let deleted_article = Article::delete(pool.get_ref().clone(), *id).await;
    match deleted_article {
        Ok(x)
            => web::Either::Left(web::Json(ResponseBody::new("Completed", x))),
        Err(err)
            => web::Either::Right(web::Json(ResponseBody::new("Database Error", format!("{:?}", err))))
    }
}