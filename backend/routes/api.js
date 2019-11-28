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
      'chatbot_id': 'd68caddf-00fd-4273-afeb-3f43794093a9',
    }
  }
  // 'chatbot_id': 'fb5e336c-7ffc-48f3-8064-f453d7d1e26e',
  // 'chatbot_id': '67041b44-fbd6-4942-8239-3d0bdfd7ac70',

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
  let parameters = {}
  parameters[req.body.param_id] = req.body.msg
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
      'param_id': req.body.param_id,
      'parameters': parameters,
      'chatbot_id': 'd68caddf-00fd-4273-afeb-3f43794093a9',
      'input_sentence': req.body.msg
    }
  }
  // 'chatbot_id': 'fb5e336c-7ffc-48f3-8064-f453d7d1e26e',
  // 'chatbot_id': '67041b44-fbd6-4942-8239-3d0bdfd7ac70',
  request.post(options, (err, response, body) => {
    if(err) {
      res.send({status: false, err})
    } else {
      res.send({
        ins_id: response.body.responseSet.result.ins_id,
        session_id: response.body.responseSet.result.session_id,
        chatflow_id: response.body.responseSet.result.chatflow_id,
        param_id: response.body.responseSet.result.param_id,
        response: response.body.responseSet.result.result,
        data: response
      })
    }
  })
})


module.exports = router;
