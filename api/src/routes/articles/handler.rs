use actix_web::{ get, web, Responder, HttpRequest };
use sqlx::PgPool;
use crate::error::MyError;
use crate::types::ResponseBody;
use crate::database::models::Article;
use super::types::QueryParams;


#[get("/")]
pub async fn get_all_articles(
    pool: web::Data<PgPool>,
    req: HttpRequest
) -> impl Responder {
    println!("Call GET_ALL_ARTICLES");
    let query_params = 
        match web::Query::<QueryParams>::from_query(req.query_string()) {
            Ok(x) => x,
            Err(err) => {
                print!("{:?}", err);
                panic!("Query parameter extraction error")
            }
        };

    let articles = 
        match &query_params.tag {
            None => Article::get_all(pool.get_ref().clone(), true).await,
            Some(tag) => Article::get_all_by_tag(pool.get_ref().clone(), true, tag.to_string()).await
        };
    
    match articles {
        Ok(x)
            =>Ok(web::Json(ResponseBody::new("Completed", x))),
        Err(_err)
            => Err(MyError::InternalError)
    }
}

#[get("/recent/")]
pub async fn get_recent_posts(
    pool: web::Data<PgPool>,
    _req: HttpRequest
) -> impl Responder {
    println!("Call GET_RECENT_POST");
    let recent_articles = Article::get_recent_posts(pool.get_ref().clone(), true, 6).await;
    match recent_articles {
        Ok(x)
            =>Ok(web::Json(ResponseBody::new("Completed", x))),
        Err(_err)
            => Err(MyError::InternalError)
    }
}

#[get("/tags/")]
pub async fn get_all_tags(
    pool: web::Data<PgPool>,
    _req: HttpRequest
) -> impl Responder {
    println!("Call GET_ALL_TAGS");
    let all_tags = Article::get_all_tags(pool.get_ref().clone(), true).await;
    match all_tags {
        Ok(x)
            =>Ok(web::Json(ResponseBody::new("Completed", x))),
        Err(_err)
            => Err(MyError::InternalError)
    }
}

#[get("/detail/{id}/")]
pub async fn get_article(
    pool: web::Data<PgPool>,
    _req: HttpRequest,
    id: web::Path<i32>
) -> impl Responder {
    println!("Call GET_ARTICLE");
    let article = Article::get_by_id(pool.get_ref().clone(), true, *id).await;
    match article {
        Ok(x)
            =>Ok(web::Json(ResponseBody::new("Completed", x))),
        Err(_err)
            => Err(MyError::InternalError)
    }
}