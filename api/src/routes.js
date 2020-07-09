const express = require('express');
const router = express.Router();

const Message = require('./controllers/MessageController');
const Order = require('./controllers/OrderController');

router.get('/messages', Message.index);
router.post('/messages', Message.create);

router.get('/orders', Order.index);
router.get('/orders/:id', Order.show);
router.post('/orders', Order.add);
router.put('/orders/:id/:status', Order.setStatus);
router.delete('/orders/:id', Order.delete);

module.exports = router;
