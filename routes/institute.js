const {Router} = require('express')
const router = Router()
const multer  = require('multer')
const upload = multer()

// Imports (controllers)
const {emailValidator, passwordValidator, stringValidator, areFieldsValidated, checkSpaces} = require('../controllers/validators')
const {fetchDocument, storeDocument} = require('../controllers/documents')
const {getAllStudents, updateDetails, registerStudent} = require('../controllers/institute')

// Routes
// Institute registers Student 
router.post('/register-student', [
    emailValidator('email'),
    stringValidator('firstname',2),
    stringValidator('lastname',2)
  ], 
  areFieldsValidated,
  registerStudent
);

// Institute can see all of its students
router.get('/students', getAllStudents)

// Update details of a Student 
router.put('/update-student', updateDetails)

// Fetch a document
router.get('/fetch-document', fetchDocument)

// Stores a document
router.post('/store-document', upload.single('document'), storeDocument)

// Exports
module.exports = router