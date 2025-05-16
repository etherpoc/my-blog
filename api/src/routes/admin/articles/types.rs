use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct CreateArticle {
    pub title: String,
    pub img_url: Option<String>,
    pub tags: Vec<String>,
    pub content: String,
}

#[derive(Debug, Deserialize)]
pub struct UpdateArticle {
    pub title: String,
    pub img_url: Option<String>,
    pub tags: Vec<String>,
    pub visibility: bool,
    pub content: Option<String>,
}
