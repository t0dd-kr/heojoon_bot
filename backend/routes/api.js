var express = require('express');
var router = express.Router();
const request = require('request')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/connect', (req, res, next) => {
  const options = {
    uri: 'https://danbee.ai/chatflow/welcome.do',
    method: 'POST',
    headers: {
      "Content-Type" : "application/json;charset=UTF-8"
    },
    json: {
      'chatbot_id': 'fb5e336c-7ffc-48f3-8064-f453d7d1e26e',
    }
  }

  request.post(options, (err, response, body) => {
    if(err) {
      res.send({status: false, err})
    } else {
      res.send({
        ins_id: response.body.responseSet.result.ins_id,
        session_id: response.body.responseSet.result.session_id,
        chatflow_id: response.body.responseSet.result.chatflow_id,
        welcome: response.body.responseSet.result.result,
        data: response
      })
    }
  })
})

router.post('/send', (req, res, next) => {
  const options = {
    uri: 'https://danbee.ai/chatflow/engine.do',
    method: 'POST',
    headers: {
      "Content-Type" : "application/json;charset=UTF-8"
    },
    json: {
      'session_id': req.body.session_id,
      'chatflow_id': req.body.chatflow_id,
      'ins_id': req.body.ins_id,
      'parameters': {
        'foods': req.body.msg,
        'symptom': req.body.msg,
      },
      'chatbot_id': 'fb5e336c-7ffc-48f3-8064-f453d7d1e26e',
      'input_sentence': req.body.msg
    }
  }

  request.post(options, (err, response, body) => {
    if(err) {
      res.send({status: false, err})
    } else {
      res.send({
        ins_id: response.body.responseSet.result.ins_id,
        session_id: response.body.responseSet.result.session_id,
        chatflow_id: response.body.responseSet.result.chatflow_id,
        response: response.body.responseSet.result.result,
        data: response
      })
    }
  })
})


module.exports = router;
