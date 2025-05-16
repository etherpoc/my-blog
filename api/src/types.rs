use std::env;
use std::fmt::{Formatter, Result};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Debug)]
pub struct ResponseBody<T> {
  pub message: String,
  pub data: T
}

impl <T> ResponseBody<T> {
  pub fn new(message: &str, data: T) -> ResponseBody<T> {
    ResponseBody { 
      message: message.to_string(),
      data
    }
  }
}

#[derive(Deserialize)]
pub struct Config {
    pub port: u16,
    pub domain: String,
    pub admin_origin_url: String,
    pub client_origin_url: String
}

impl Default for Config {
    fn default() -> Self {
        Config {
          port: env::var("PORT").unwrap().parse().unwrap(),
          domain: env::var("DOMAIN").unwrap(),
          admin_origin_url: env::var("ADMIN_ORIGIN_URL").unwrap(),
          client_origin_url: env::var("CLIENT_ORIGIN_URL").unwrap(),
        }
    }
}

#[derive(Serialize, Debug)]
pub struct ErrorMessage {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error_description: Option<String>,
    pub message: String,
}

impl std::fmt::Display for ErrorMessage {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result {
        write!(f, "{}", self.message)
    }
}