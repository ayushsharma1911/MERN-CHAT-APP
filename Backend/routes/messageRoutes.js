const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageControllers.js");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// get all the message
router.route('/:chatId').get(protect, allMessages);

//send message
router.route('/').post(protect, sendMessage);

module.exports = router;