import Order from '../models/Order';
import Recipient from '../models/Recipient';

class ViewOrderController {
  async index(req, res) {
    const { deliveryman_id } = req.params;

    const orders = await Order.findAll({
      where: { deliveryman_id, canceled_at: null, end_date: null },
      attributes: ['id', 'product', 'start_date', 'end_date'],
      order: ['id'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'street', 'number', 'city', 'state', 'zipcode'],
        },
      ],
    });

    return res.json(orders);
  }
}

export default new ViewOrderController();
