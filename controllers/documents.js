const { fabloGet } = require("./fablo-rest")
// const {create : IPFScreate} = require('ipfs-core')

// let _ipfs = undefined
// const _getIPFS = async () => {
//   if(_ipfs) return _ipfs
//   _ipfs = await IPFScreate()
// } 

exports.fetchDocument = async (req, res) => {
  // Call hyperledger fabric to get IPFS hash using provided keyword

  let userid;
  if( req.auth && req.auth.id != undefined) userid = req.auth.id
  else userid =  req.body.userid

  const {instituteCode, key} =  req.body
  
  await fabloGet(userid).then(response=> {
    const student = JSON.parse(response.data.response.success)

    let ipfsHash;
    if(instituteCode){
      const institute = student.education.filter(inst => inst.code == instituteCode)
      if (institute.length==0 && !institute[0].documents[key]){
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
  }).catch(err=>{
    const errors  = err.errors || Array(err)
    const errorMessages = errors.map(error => {
      return { msg: error.message, param: error.path}
    })
    res.status(400).json({errors:errorMessages})
  })
}

exports.verifyDocument = async (req, res) => {
  // Get IPFS hash from blockchain and return whether both matches or not
  const {userid, instituteCode, key, ipfsHash} =  req.body
  
  await fabloGet(userid).then(response=>{
    const student = JSON.parse(response.data.response.success)
    let isVerified = false
    if(instituteCode){
      const institute = student.education.filter(inst => inst.code == instituteCode)
      if (institute.length == 0 && !institute[0].documents[key]){
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
  }).catch(err=>{
    const errors  = err.errors || Array(err)
    const errorMessages = errors.map(error => {
      return { msg: error.message, param: error.path}
    })
    res.status(400).json({errors:errorMessages})
  })
}

exports.storeDocument = async (req, res) => {
  // const ipfs = await _getIPFS()
  // const {cid} = ipfs.add()
  // // TODO: Update in blockchain
}