import DeliveryProblems from '../models/DeliveryProblems';
import Order from '../models/Order';

class DeliveryProblemsController {
  async index(req, res) {
    const orders = await Order.findAll({
      attributes: ['id', 'product', 'start_date', 'end_date'],
      include: [
        {
          model: DeliveryProblems,
          as: 'deliveryProblems',
          attributes: ['id', 'description'],
          required: true,
        },
      ],
    });
    return res.json(orders);
  }
}

export default new DeliveryProblemsController();
