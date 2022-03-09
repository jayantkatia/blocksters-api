const {Router} = require('express')
const router = Router()

// Imports (controllers)
const {emailValidator, areFieldsValidated} = require('../controllers/validators')
const {signin, signout, isAuthenticated, isSignedIn} = require('../controllers/student-auth')
const {getDetails} = require('../controllers/student')
const {fetchDocument, listDocuments} = require('../controllers/documents')

// Routes
// Student signs in
router.post('/signin', 
  emailValidator('email'),
  areFieldsValidated,
  signin
)

// get all details after student signs in
router.get('/details',
  isSignedIn,
  isAuthenticated,
  getDetails
)

// fetch document when student requests
router.get('/fetch-document',
  isSignedIn,
  isAuthenticated,
  fetchDocument
)

// Student signs out
router.get('/signout', signout)

// Exports
module.exports = router
