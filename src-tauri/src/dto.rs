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
    #[serde(alias = "provinceCode")]
    pub province_code: i64,

    #[serde(alias = "districtCode")]
    pub district_code: i64,

    #[serde(alias = "wardCode")]
    pub ward_code: i64,
    pub address: String,
    pub persons: Vec<PersonCreateInput>,
}
