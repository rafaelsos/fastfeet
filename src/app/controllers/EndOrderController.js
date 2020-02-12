import Order from '../models/Order';

class EndOrderController {
  async update(req, res) {
    const { id } = req.params;
    const { deliveryman_id } = req.body;

    /**
     * verify exist order
     */
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'Order does not exist' });
    }

    /**
     * check if the delivery id is from that order
     */
    const checkDeliveryman = await Order.findOne({
      where: { id, deliveryman_id },
    });

    if (!checkDeliveryman) {
      return res
        .status(400)
        .json({ error: 'Delivery person cannot pick up order' });
    }

    const { product, recipient_id, start_date, end_date } = await order.update({
      ...order,
      end_date: new Date(),
    });

    return res.json({
      id,
      product,
      recipient_id,
      deliveryman_id,
      start_date,
      end_date,
    });
  }
}

export default new EndOrderController();
