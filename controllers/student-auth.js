const jwt = require('jsonwebtoken')
const Users = require('../models/user')


exports.signin = async (req, res) => {
  const {email, password} = req.body
  const user = await Users.findOne({where: {email}, raw: false})
  
  // User does not exist
  if(user === null){
    res.status(404).json({errors: [{msg: 'User not found, kindly signup first'}]})
  }

  // Incorrect email/password
  if(!user.isAuthenticate(password)){
    res.status(400).json({errors: [{msg: 'Incorrect email or password'}]})
  }

  const {username, fullname, userid} = user

  // Success
  const token = jwt.sign({id: userid}, process.env.SECRET)
  res.cookie('token', token, {
    expiresIn: '2 days'
  })
  res.sendStatus(204)

}

// Protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth'
})

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile.userid == req.auth.id;
  if (!checker) {
    return res.status(403).json({
      errors: [
        {
          msg: "Access denied",
        }
      ]
    });
  }
  next();
}

exports.signout = (req, res) => {
  res.clearCookie()
  res.status(200).json({
    msg: 'User sign out'
  })
}