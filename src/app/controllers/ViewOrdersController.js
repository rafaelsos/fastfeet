import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

class ViewOrderController {
  async index(req, res) {
    const { deliveryman_id } = req.params;

    // deve retornar as encomendas atribuidas a ele, que não estejam entregues ou canceladas;
    const orders = await Order.findAll({
      where: {
        deliveryman_id,
        end_date: null,
        canceled_at: null,
      },
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
      order: ['id'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'street', 'number', 'city', 'state', 'zipcode'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(orders);
  }
}

export default new ViewOrderController();
