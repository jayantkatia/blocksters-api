const { response } = require('express')
const { fabloGet } = require('./fablo-rest')

exports.getDetails = async (req, res) => {
  const userid = req.auth.id
  console.log(userid)
  try {
    await fabloGet(userid).then( response =>{
      const result = JSON.parse(response.data.response.success)
      res.status(200).json({response: result})
    })
  } catch (err) {
    const errors = err.errors || Array(err)
    const errorMessages = errors.map(error => {
      return { msg: error.message, param: error.path }
    })
    res.status(400).json({ errors: errorMessages })
  }
}   