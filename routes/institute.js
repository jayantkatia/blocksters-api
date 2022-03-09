const {Router} = require('express')
const router = Router()

// Imports (controllers)
const {emailValidator, passwordValidator, stringValidator, areFieldsValidated, checkSpaces} = require('../controllers/validators')
const {signup} = require('../controllers/student-auth')
const {fetchDocument, storeDocument} = require('../controllers/documents')
const {getAllStudents} = require('../controllers')

// Routes
// Institute registers Student 
router.post('/register-student', [
    emailValidator('email'),
    passwordValidator('password'),
    stringValidator('username', 5),
    checkSpaces('username'),
    stringValidator('firstname',2),
    stringValidator('lastname',2)
  ], 
  areFieldsValidated,
  signup
);

// Institute can see all of its students
router.get('/students', getAllStudents)

// Update details of a Student 
router.put('/update-details', updateDetails)

// Fetch a document
router.get('/fetch-documents', fetchDocument)

// Stores a document
router.post('/store-documents', storeDocument)

// Exports
module.exports = router