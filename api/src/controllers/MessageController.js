/** @module MessageController */

const Message = require("../models/Message");

class MessageController {
  /**
   * Get messages
   * @param {*} request 
   * @param {*} response 
   */
  async index(request, response) {
    try {
      const messages = await Message.find();
      return response.status(200).json(messages);
    } catch(err) {
      return response.status(500).json({ success: false, message: "Internal Error" });
    }
  }

  /**
   * Add a message
   * @param {*} request 
   * @param {*} response 
   */
  async create(request, response) {
    try {
      const { value, from } = request.body;

      if (!value)
        return response.status(400).json({ success: false, message: "Empty data" });

      const create = await Message.create({
        value,
        from
      });

      if (!create)
        return response.status(500).json({ success: false, message: "Internal Error" });

      return response.status(200).json({ success: true, message: create });
      
    } catch(err) {
      return response.status(500).json({ success: false, message: "Internal Error" });
    }
  }
}

module.exports = new MessageController();
