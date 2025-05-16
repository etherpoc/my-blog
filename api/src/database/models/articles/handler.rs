use sqlx::postgres::PgQueryResult;

use super::types::{Article, Tags};

impl Article {
    pub async fn get_all(pool: sqlx::PgPool, only_visible: bool) -> Result<Vec<Article>, sqlx::Error> {
        let sql = 
            if only_visible 
                {format!("SELECT id, title, img_url, tags, LEFT(content, 100) AS content, visibility, created_at, updated_at, pv FROM articles WHERE visibility=true ORDER BY id;")}
            else 
                {format!("SELECT id, title, img_url, tags, LEFT(content, 100) AS content, visibility, created_at, updated_at, pv FROM articles ORDER BY id;")};
        sqlx::query_as::<_, Article>(sql.as_str()).fetch_all(&pool).await
    }

    pub async fn get_recent_posts(pool: sqlx::PgPool, only_visible: bool, limit: i32) -> Result<Vec<Article>, sqlx::Error> {
        let sql = 
            if only_visible 
                {format!("SELECT id, title, img_url, tags, LEFT(content, 100) AS content, visibility, created_at, updated_at, pv FROM articles WHERE visibility=true ORDER BY created_at DESC LIMIT {};", limit)}
            else 
                {format!("SELECT id, title, img_url, tags, LEFT(content, 100) AS content, visibility, created_at, updated_at, pv FROM articles ORDER BY created_at DESC LIMIT {};", limit)};
        sqlx::query_as::<_, Article>(sql.as_str()).fetch_all(&pool).await
    }

    pub async fn get_by_id(pool: sqlx::PgPool, only_visible: bool, id: i32) -> Result<Article, sqlx::Error> {
        let sql = 
            if only_visible 
                {format!("SELECT * from articles WHERE visibility=true AND id={} LIMIT 1;", id)}
            else 
                {format!("SELECT * from articles WHERE id={} LIMIT 1;", id)};
        sqlx::query_as::<_, Article>(sql.as_str()).fetch_one(&pool).await
    }

    pub async fn get_all_by_tag(pool: sqlx::PgPool, only_visible: bool, tag: String) -> Result<Vec<Article>, sqlx::Error>{
        let sql = 
            if only_visible 
                {format!("SELECT id, title, img_url, tags, LEFT(content, 100) AS content, visibility, created_at, updated_at, pv from articles WHERE '{}'=ANY(tags) AND visibility=true ORDER BY id;", tag)}
            else
                {format!("SELECT id, title, img_url, tags, LEFT(content, 100) AS content, visibility, created_at, updated_at, pv from articles WHERE '{}'=ANY(tags) ORDER BY id;", tag)};
        sqlx::query_as::<_, Article>(sql.as_str()).fetch_all(&pool).await
    }

    pub async fn get_all_tags(pool: sqlx::PgPool, only_visible: bool) -> Result<Vec<Tags>, sqlx::Error>{
        let sql = 
            if only_visible
                {format!("SELECT tags from articles WHERE visibility=true ORDER BY id;")}
            else
                {format!("SELECT tags from articles ORDER BY id;")};

        sqlx::query_as::<_, Tags>(sql.as_str()).fetch_all(&pool).await
    }
    pub async fn insert(pool: sqlx::PgPool, title: String, img_url: Option<String>, tags: Vec<String>, content: String) -> Result<PgQueryResult, sqlx::Error>{
        let tags_for_query = tags_to_string(tags);
        let img_url_for_query = match img_url {
            None => "NULL".to_string(),
            Some(x) => x
        };

        let sql = 
            format!(
                "INSERT INTO articles (\"title\", \"img_url\", \"tags\", \"content\") VALUES ('{}', '{}', '{{{}}}', '{}');",
                title, img_url_for_query, tags_for_query, content);

        sqlx::query(sql.as_str()).execute(&pool).await
    }
      
    pub async fn update(pool: sqlx::PgPool, id:i32, title: String, img_url: Option<String>, tags:Vec<String>, content:Option<String>, visibility: bool) -> Result<PgQueryResult, sqlx::Error>{
        let tags_for_query = tags_to_string(tags);
        let img_url_for_query = match img_url {
            None => "NULL".to_string(),
            Some(x) => x
        };

        let sql = match content {
            Some(x) => format!(
              "UPDATE articles SET (title, img_url, tags, content, visibility, updated_at) = ('{}', '{}', '{{{}}}', '{}', {}, CURRENT_TIMESTAMP) WHERE id={};", 
              title, img_url_for_query, tags_for_query, x, visibility, id),
            None => format!(
              "UPDATE articles SET (title, img_url, tags, visibility, updated_at) = ('{}', '{}', '{{{}}}', {}, CURRENT_TIMESTAMP) WHERE id={};", 
              title, img_url_for_query, tags_for_query, visibility, id)
        };

        sqlx::query(sql.as_str()).execute(&pool).await
    }

    pub async fn _increment_pv(pool: sqlx::PgPool, id:i32) -> Result<PgQueryResult, sqlx::Error>{
        let sql = format!(
            "UPDATE articles SET \"pv\" = \"pv\" + 1 WHERE id={};", id);
        sqlx::query(sql.as_str()).execute(&pool).await
    }
      
    pub async fn delete(pool: sqlx::PgPool, id: i32) -> Result<PgQueryResult, sqlx::Error>{
        let sql = format!(
            "DELETE from articles WHERE id = {};", id);
        sqlx::query(sql.as_str()).execute(&pool).await
    }
}

// tagsをカンマで区切ったStringにする
// 例 ["c++", "js", "java"] → '"c++","js","java"'
fn tags_to_string(tags: Vec<String>) -> String {
    let mut tags_for_query = "".to_string();
    if tags.len() > 0 {
        tags_for_query = tags[0].clone();
    }
    tags.iter().skip(1).for_each(|x| tags_for_query += format!(",\"{}\"", x.trim()).as_str());

    tags_for_query
}