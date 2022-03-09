const { fabloGet } = require('./fablo-rest')

exports.getDetails = async (req, res) => {
  const { suid } = req.body
  try {
    const { response } = await fabloGet(suid)
    res.status(200).json({ response })
  } catch (err) {
    const errors = err.errors || Array(err)
    const errorMessages = errors.map(error => {
      return { msg: error.message, param: error.path }
    })
    res.status(400).json({ errors: errorMessages })
  }
}   