use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct QueryParams {
    pub tag: Option<String>
}