const { Router } = require('express')
const router = Router()

// Imports (controllers)
const { stringValidator } = require('../controllers/validators')
const { verifyDocument } = require('../controllers/documents')

// Routes
// get whether IPFS hash provided matches with the IPFS hash in the blockchain
router.post('/verify',
  stringValidator('ipfs_hash', 46),
  verifyDocument
)

// Exports
module.exports = router