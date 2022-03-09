
class education {
  constructor(code, name, graduationYear, graduationMonth, course, branch, admissionYear, admissionMonth, documents) {
    this.code = code
    this.name = name
    this.graduationYear = graduationYear
    this.graduationMonth = graduationMonth
    this.course = course
    this.branch = branch
    this.admissionYear = admissionYear
    this.admissionMonth = admissionMonth
    this.documents = documents
  }

  toJson() {
    return JSON.stringify(this)
  }

  fromJson(obj) {
    return Object.assign(this, JSON.parse(obj))
  }
}

class Student {
  constructor(firstname, lastname, userid, email, guardianName, guardianContact, education, commonDocuments) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.guardianName = guardianName;
    this.guardianContact = guardianContact;
    this.education = education;
    this.commonDocuments = commonDocuments;
  }

  toJson() {
    return JSON.stringify(this)
  }

  fromJson(obj) {
    return Object.assign(this, JSON.parse(obj))
  }
}
