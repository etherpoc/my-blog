use actix_web::{ get, web, Responder, HttpRequest};
use serde::Deserialize;
use std::collections::HashSet;
use serde_json::json;
use sqlx::PgPool;
use crate::extractors::Claims;
use crate::{error::MyError, types::ResponseBody};
use crate::database::models::{Article, OrderOption};

#[derive(Debug, Deserialize)]
pub struct QueryParams {
    pub tag: Option<String>,
    pub page: Option<String>,
    pub order_by: Option<String>,
    pub order_column: Option<String>
}

#[get("/all")]
pub async fn all(
  claims: Claims,
  req: HttpRequest,
  pool: web::Data<PgPool>
) -> impl Responder {
    println!("Call ADMIN_GET_ALL_ARTICLES");
    if claims.validate_permissions(&HashSet::from(["admin".to_string()])) {
      let query_params = web::Query::<QueryParams>::from_query(req.query_string())
      .map_err(|err| {
          eprintln!("{:?}", err);
          MyError::BadRequest
      })?;

      let page = query_params.page.as_deref().and_then(|s| s.parse().ok()).unwrap_or(0);

      const VALID_COLUMNS: [&str; 4] = ["id", "title", "created_at", "updated_at"];
      const VALID_ORDERS: [&str; 2] = ["ASC", "DESC"];

      let order_column = query_params.order_column.as_deref()
          .filter(|col| VALID_COLUMNS.contains(col))
          .unwrap_or("id")
          .to_string();

      let order_by = query_params.order_by.as_deref()
          .filter(|ord| VALID_ORDERS.contains(ord))
          .unwrap_or("DESC")
          .to_string();

      let order_option = OrderOption { order_column, order_by };

      let articles = match &query_params.tag {
          Some(tag) => Article::get_all_by_tag(pool.get_ref().clone(), false, tag.clone(), 20, page, order_option).await,
          None => Article::get_all(pool.get_ref().clone(), false, 20, page, order_option).await,
      };

      match articles {
          Ok((articles, total_page)) => {
              let res = json!({ "articles": articles, "page": page, "total_page": total_page });
              Ok(web::Json(ResponseBody::new("Completed", res)))
          }
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
