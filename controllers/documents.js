const { fabloGet } = require("./fablo-rest")

exports.fetchDocument = async (req, res) => {
  // Call hyperledger fabric to get IPFS hash using provided keyword
  const {userid, instituteCode, key} =  req.body
  const {response} = await fabloGet(userid)
  const student = new Student().fromJson(response)

  let ipfsHash;
  if(instituteCode){
    const institute = student.education.filter(inst => inst.code == instituteCode)
    if (institute.length()==0 && !institute[0].documents[key]){
      res.send(204).json({
        message: 'No Content'
      })
    }
    ipfsHash = institute[0].documents[key]
  }else{
    if(student.commonDocuments[key]){
      res.send(204).json({
        message: 'No Content'
      })
    }
    ipfsHash = student.commonDocuments[key]
  }

  res.status(200).json({
    response: {
      ipfsHash,
    }
  })
}

exports.verifyDocument = async (req, res) => {
  // Get IPFS hash from blockchain and return whether both matches or not
  const {userid, instituteCode, key, ipfsHash} =  req.body
  const {response} = await fabloGet(userid)
  const student = new Student().fromJson(response)

  let isVerified = false
  if(instituteCode){
    const institute = student.education.filter(inst => inst.code == instituteCode)
    if (institute.length()==0 && !institute[0].documents[key]){
      res.send(204).json({
        message: 'No Content'
      })
    }
    isVerified = institute[0].documents[key] == ipfsHash
  }else{
    if(student.commonDocuments[key]){
      res.send(204).json({
        message: 'No Content'
      })
    }
    isVerified = student.commonDocuments[key] == ipfsHash 
  }

  res.status(200).json({
    response: {
      isVerified
    }
  })
}

exports.storeDocument = async (req, res) => {
  // TODO: Upload to IPFS
  // TODO: Update in blockchain
}