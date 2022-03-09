const Users = require('../models/user')

exports.registerStudent = (req, res) => {
  const {email, password, firstname, lastname} = req.body
  Users.create({
      email,
      password,
      firstname,
      lastname
  }).then(user => {
    // TODO: Call Fablo API
    // TODO: If error delete from database
  }).catch(err => {
    // TODO: delete from database
    const errors  = err.errors || Array(err)
    const errorMessages = errors.map(error => {
      return { msg: error.message, param: error.path}
    })
    res.status(400).json({errors:errorMessages})
  })
}

exports.getAllStudents = async (req, res) => {
  // TODO: Get all Students from db 
  // TODO: Get all students from hyperledger
}

exports.updateDetails = async (req, res) => {
  // TODO: update details in hyperledger 
}