import DeliveryProblems from '../models/DeliveryProblems';
import Order from '../models/Order';

class DeliveryProblemsIdController {
  async store(req, res) {
    const { delivery_id } = req.params;
    const { description, deliveryman_id } = req.body;

    /**
     * verify exist order
     */
    const order = await Order.findByPk(delivery_id);

    if (!order) {
      return res.status(400).json({ error: 'Order does not exist' });
    }

    /**
     * check if the delivery id is from that order
     */
    const checkDeliveryman = await Order.findOne({
      where: { delivery_id, deliveryman_id },
    });

    if (!checkDeliveryman) {
      return res
        .status(400)
        .json({ error: 'Delivery person cannot pick up order' });
    }

    const deliveryProblem = await DeliveryProblems.create({
      delivery_id,
      description,
    });

    return res.json(deliveryProblem);
  }

  async index(req, res) {
    const { delivery_id } = req.params;

    const deliveryProblems = await DeliveryProblems.findAll({
      where: delivery_id,
    });
    return res.json(deliveryProblems);
  }
}

export default new DeliveryProblemsIdController();
