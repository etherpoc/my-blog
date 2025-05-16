use actix_web::{
    error, http::{header::ContentType, StatusCode},
    HttpResponse
};
use derive_more::{Display, Error};

#[derive(Debug, Display, Error)]
pub enum MyError {
    #[display(fmt = "internal error")]
    InternalError,
    
    #[display(fmt = "bad request")]
    BadRequest,

    #[display(fmt = "timeout")]
    _Timeout,

    #[display(fmt = "forbidden")]
    Forbidden,
}

impl error::ResponseError for MyError {
    fn error_response(&self) -> HttpResponse<actix_web::body::BoxBody> {
        HttpResponse::build(self.status_code())
            .insert_header(ContentType::json())
            .body(self.to_string())
    }
    fn status_code(&self) -> StatusCode {
        match *self {
            MyError::InternalError => StatusCode::INTERNAL_SERVER_ERROR,
            MyError::BadRequest => StatusCode::BAD_REQUEST,
            MyError::Forbidden => StatusCode::FORBIDDEN,
            MyError::_Timeout => StatusCode::GATEWAY_TIMEOUT,
        }
    }
}