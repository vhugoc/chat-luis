const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
  return response.json({ status: "Running" });
});

module.exports = router;
