#[derive(Debug, serde::Serialize)]
pub struct PersonModel {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub id: Option<i64>,

    #[serde(rename(serialize = "firstName"), skip_serializing_if = "Option::is_none")]
    pub first_name: Option<String>,

    #[serde(rename(serialize = "lastName"), skip_serializing_if = "Option::is_none")]
    pub last_name: Option<String>,

    #[serde(rename(serialize = "familyId"), skip_serializing_if = "Option::is_none")]
    pub family_id: Option<i64>,

    #[serde(rename(serialize = "religiousName"), skip_serializing_if = "Option::is_none")]
    pub religious_name: Option<String>,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub birthdate: Option<i64>,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub address: Option<String>,
}

#[allow(unused)]
impl PersonModel {
    pub fn new() -> Self {
        PersonModel {
            id: None,
            first_name: None,
            last_name: None,
            family_id: None,
            religious_name: None,
            birthdate: None,
            address: None,
        }
    }

    pub fn set_id(&mut self, id: i64) {
        self.id = Some(id)
    }

    pub fn set_first_name(&mut self, first_name: String) {
        self.first_name = Some(first_name)
    }

    pub fn set_last_name(&mut self, last_name: String) {
        self.last_name = Some(last_name)
    }

    pub fn set_birthdate(&mut self, birthdate: i64) {
        self.birthdate = Some(birthdate)
    }

    pub fn set_family_id(&mut self, family_id: i64) {
        self.family_id = Some(family_id)
    }

    pub fn set_religious_name(&mut self, religious_name: String) {
        self.religious_name = Some(religious_name)
    }

    pub fn set_address(&mut self, address: String) {
        self.address = Some(address)
    }
}
