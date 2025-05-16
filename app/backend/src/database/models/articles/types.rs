use chrono::Utc;
use serde::Serialize;

#[derive(Debug, Serialize, sqlx::FromRow)]
pub struct Article {
    pub id:         i16,
    pub title:      String,
    pub img_url:    Option<String>,
    pub tags:       Vec<String>,
    pub content:    String,
    pub visibility: bool,
    pub created_at: chrono::DateTime<Utc>,
    pub updated_at: chrono::DateTime<Utc>,
    pub pv:         i32
}

impl Default for Article {
    fn default() -> Self {
        Article {
            id: -1,
            title: "title".to_string(),
            img_url: None,
            tags: vec![],
            content: "content".to_string(),
            visibility: false,
            created_at: chrono::Utc::now(),
            updated_at: chrono::Utc::now(),
            pv: 0
        }
    }
}

#[derive(Debug, Serialize, sqlx::FromRow)]
pub struct Tags {
    pub tags: Vec<String>,
}

#[derive(Debug, Serialize, sqlx::FromRow)]
pub struct Page {
    pub page: i32,
}

#[derive(Debug, Serialize)]
pub struct OrderOption {
    pub order_column: String,
    pub order_by: String
}
