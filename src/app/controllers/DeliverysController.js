import { Op } from 'sequelize';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Signature from '../models/Signature';

class DeliverysController {
  async index(req, res) {
    const { deliveryman_id } = req.params;

    const orders = await Order.findAll({
      where: {
        deliveryman_id,
        end_date: { [Op.ne]: null },
      },
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'canceled_at',
        'signature_id',
      ],
      order: ['id'],
      include: [
        {
          model: Signature,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
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

export default new DeliverysController();
