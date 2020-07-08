const express = require('express');
const router = express.Router();

const Message = require('./controllers/MessageController');

router.get('/messages', Message.index);
router.post('/messages', Message.create);

module.exports = router;
