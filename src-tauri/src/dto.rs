#[derive(serde::Deserialize)]
pub struct PersonCreateInput {
    #[serde(alias = "firstName")]
    pub first_name: String,

    #[serde(alias = "lastName")]
    pub last_name: String,

    #[serde(alias = "religiousName")]
    pub religious_name: Option<String>,
    pub birthdate: i64,

    #[serde(alias = "searchName")]
    pub search_name: String
}

#[derive(serde::Deserialize)]
pub struct FamilyCreateInput {
    #[serde(alias = "provinceId")]
    pub province_id: String,

    #[serde(alias = "districtId")]
    pub district_id: String,

    #[serde(alias = "wardId")]
    pub ward_id: String,
    pub address: String,
    pub persons: Vec<PersonCreateInput>,
}
