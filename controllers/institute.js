const { default: axios } = require('axios')
const { v4: uuidv4 } = require('uuid');
const Students = require('../models/student')
const { fabloGet, fabloPut } = require('./fablo-rest');
const { mailOne } = require('./mailer');
const {MAIL_FROM_NAME} = process.env

exports.registerStudent = (req, res) => {
  const {email, firstname, lastname} = req.body
  const password = uuidv4()
  Students.create({
      email,
      password,
      firstname,
      lastname
  }).then(async ({userid}) => {
    try{
      console.log('Hello')
      await fabloPut(userid, JSON.stringify(req.body))
      console.log('Hello')

// Mail Student credentials
//     const subject = `🔒 Credentials | ${MAIL_FROM_NAME}`
//     const message = `Greetings,
// <br>You have been registered. Your credentials are: <br><br>username: ${email}<br>password: ${password}`
//     mailOne(email, subject, message)
    
    }catch(err){
      console.log('Here')
      console.log(err)
      Students.destroy({
        where: {
          userid: userid
        }
      })
      const errors  = err.errors || Array(err)
      const errorMessages = errors.map(error => {
        return { msg: error.message, param: error.path}
      })
      res.status(400).json({errors:errorMessages})
    }
  }).catch(err => {
    const errors  = err.errors || Array(err)
    const errorMessages = errors.map(error => {
      return { msg: error.message, param: error.path}
    })
    res.status(400).json({errors:errorMessages})
  })
}

exports.getAllStudents = async (req, res) => {
  const allStudents = await Students.findAll({
    attributes: {include: ['userid']},
  })
  if(allStudents == null){
    res.status(204).json({
      message: "No Content"
    })
  }
  
  // Get all students from hyperledger
  const requests = allStudents.map( ({userid}) => {
    return fabloGet(userid)
  })
  await axios.all(requests).then(axios.spread((...responses) => {
      res.status(200).json({
        response: responses
      })
    })
  ).catch(err => {
    const errors  = err.errors || Array(err)
    const errorMessages = errors.map(error => {
      return { msg: error.message, param: error.path}
    })
    res.status(400).json({errors:errorMessages})
  })
}

exports.updateDetails = async (req, res) => {
  // update details in hyperledger
  const {userid, ...student} = req.body
  await fabloPut(userid, student).catch(err => {
  const errors  = err.errors || Array(err)
  const errorMessages = errors.map(error => {
    return { msg: error.message, param: error.path}
  })
  res.status(400).json({errors:errorMessages})
  })

  res.status(200).json({
  message: "OK"
})
}