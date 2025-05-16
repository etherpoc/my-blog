use actix_web::{ get, web, Responder };
use crate::types::ResponseBody;

#[get("")]
pub async fn index() -> impl Responder{
    println!("Call ARTICLES_HELP");
    web::Json(ResponseBody::new("Articles API", "help"))
}