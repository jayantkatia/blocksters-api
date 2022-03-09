const { default: axios } = require("axios")

const { HYPERLEDGER_NODE_IP, HYPERLEDGER_NODE_USERNAME, HYPERLEDGER_NODE_PASSWORD, HYPERLEDGER_CHANNEL, HYPERLEDGER_CHANNEL_CHAINCODE} = process.env

let _token = undefined
const _authenticate = async () => {
  if (_token != undefined) return
  await axios.post(`http://${HYPERLEDGER_NODE_IP}/user/enroll`, JSON.stringify(
    {
      "id": HYPERLEDGER_NODE_USERNAME,
      "secret": HYPERLEDGER_NODE_PASSWORD
    }
  )).then(response => {
    _token = response.data.token
  })
}

exports.fabloPut = async (key, value) => {
  await _authenticate()
  return axios.post(
    `http://${HYPERLEDGER_NODE_IP}/invoke/${HYPERLEDGER_CHANNEL}/${HYPERLEDGER_CHANNEL_CHAINCODE}`,
    JSON.stringify({
      "method": "KVContract:put",
      "args": [
        key,
        value
      ]
    }),
    {
      headers: {
        'Authorization': `Bearer ${_token}`
      }
    }
  )
}

exports.fabloGet = async (key) => {
  await _authenticate()
  return axios.post(
    `http://${HYPERLEDGER_NODE_IP}/invoke/${HYPERLEDGER_CHANNEL}/${HYPERLEDGER_CHANNEL_CHAINCODE}`,
    JSON.stringify({
      "method": "KVContract:get",
      "args": [
        key
      ]
    }),
    {
      headers: {
        'Authorization': `Bearer ${_token}`
      }
    }
  )
}
