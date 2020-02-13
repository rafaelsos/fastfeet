import DeliveryProblems from '../models/DeliveryProblems';
import Order from '../models/Order';

class DeliveryProblemsIdController {
  async store(req, res) {
    const { delivery_id } = req.params;
    const { description, deliveryman_id } = req.body;

    /**
     * verify exist order
     */
    const order = await Order.findOne({
      where: {
        id: delivery_id,
      },
    });

    if (!order) {
      return res.status(400).json({ error: 'Order does not exist' });
    }

    /**
     * check if the delivery id is from that order
     */
    const checkDeliveryman = await Order.findOne({
      where: {
        id: delivery_id,
        deliveryman_id,
      },
    });

    if (!checkDeliveryman) {
      return res
        .status(400)
        .json({ error: 'delivery person cannot pick up order' });
    }

    const delivery = await DeliveryProblems.create({
      delivery_id,
      description,
    });

    return res.json(delivery);
  }

  async index(req, res) {
    const { delivery_id } = req.params;

    const orders = await Order.findAll({
      attributes: ['id', 'product', 'start_date', 'end_date'],
      include: [
        {
          model: DeliveryProblems,
          as: 'deliveryProblems',
          where: { delivery_id },
          attributes: ['id', 'description'],
          required: true,
        },
      ],
    });
    return res.json(orders);
  }

  async delete(req, res) {
    const { id } = req.params;
    const order = await Order.findOne({
      include: [
        {
          model: DeliveryProblems,
          as: 'deliveryProblems',
          where: { id },
          required: true,
        },
      ],
    });

    order.destroy();

    return res.json({ message: 'Order successfully deleted' });
  }
}

export default new DeliveryProblemsIdController();
