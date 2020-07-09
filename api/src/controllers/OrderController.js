/** @module OrderController */

const Order = require('../models/Order');

class OrderController {
  /**
   * Show orders
   * @param {*} request 
   * @param {*} response 
   */
  async index(request, response) {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      return response.status(200).json(orders);
    } catch(err) {
      return response.status(500).json({ success: false, message: "Internal Error" });
    }
  }

  /**
   * Show an order
   * @param {*} request 
   * @param {*} response 
   */
  async show(request, response) {
    try {
      const id = request.params.id;

      const order = await Order.findOne({ _id: id });

      if (!order)
        return response.status(400).json({ success: false, message: "This order does not exists" });

      return response.status(200).json(order);

    } catch(err) {
      return response.status(500).json({ success: false, message: "Internal Error" });
    }
  }

  /**
   * Add an order
   * @param {*} request 
   * @param {*} response 
   */
  async add(request, response) {
    try {
      const { products } = request.body;
      
      if (!products)
        return response.status(400).json({ success: false, message: "Empty data" });

      const exists = await Order.findOne({ status: "waiting" });

      if (exists)
        return response.status(400).json({ success: false, message: "An order already exists" });

      const create = await Order.create({
        status: "waiting",
        products
      });

      if (!create)
        return response.status(500).json({ success: false, message: "Internal Error" });

      return response.status(200).json({ success: true, create });

    } catch(err) {
      return response.status(500).json({ success: false, message: "Internal Error" });
    }
  }

  async setStatus(request, response) {
    try {
      const { id, status } = request.params;

      if (status !== "waiting" && status !== "confirmed")
        return response.status(400).json({ success: false, message: "Invalid status" });

      const order = await Order.findOne({ _id: id });

      if (!order)
        return response.status(400).json({ success: false, message: "This order does not exists" });

      const setStatus = await Order.update({ _id: id }, {
        status,
        products: order.products
      })

      if (!setStatus)
        return response.status(500).json({ success: false, message: "Internal Error" });

      return response.status(200).json({ success: true, message: "Status has been modified" });

    } catch(err) {
      return response.status(500).json({ success: false, message: "Internal Error" });
    }
  }

  /**
   * Delete an order
   * @param {*} request 
   * @param {*} response 
   */
  async delete(request, response) {
    try {
      const id = request.params.id;
      let remove = '';

      if (id === "cancel") {
        remove = await Order.deleteOne({ status: "waiting" });
      } else {
        const order = await Order.findOne({ _id: id });

        if (!order)
          return response.status(400).json({ success: false, message: "This order does not exists" });
        
        remove = await Order.deleteOne({ _id: id }); 
      }

      if (!remove)
        return response.status(500).json({ success: false, message: "Internal Error" });

      return response.status(200).json({ success: true, message: "Status has been deleted" });

    } catch(err) {
      return response.status(500).json({ success: false, message: "Internal Error" });
    }
  }
}

module.exports = new OrderController();
