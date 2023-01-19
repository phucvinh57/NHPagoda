#[derive(serde::Deserialize)]
pub struct PersonCreateInput {
    pub first_name: String,
    pub last_name: String,
    pub religious_name: Option<String>,
    pub birthdate: i64,
    pub search_name: String
}

#[derive(serde::Deserialize)]
pub struct FamilyCreateInput {
    pub province_code: i64,
    pub district_code: i64,
    pub ward_code: i64,
    pub address: String,
    pub persons: Vec<PersonCreateInput>,
}
