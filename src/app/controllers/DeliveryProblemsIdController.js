import * as Yup from 'yup';
import DeliveryProblems from '../models/DeliveryProblems';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import CanceledOrderMail from '../jobs/CanceledOrderMail';
import Queue from '../../lib/Queue';

class DeliveryProblemsIdController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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
    const schema = Yup.object().shape({
      delivery_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const order = await Order.findOne({
      attributes: [
        'id',
        'product',
        'deliveryman_id',
        'recipient_id',
        'canceled_at',
      ],
      include: [
        {
          model: DeliveryProblems,
          as: 'deliveryProblems',
          where: { id },
          attributes: ['id', 'delivery_id', 'description'],
          required: true,
        },
      ],
    });

    const deliveryProblems = await DeliveryProblems.findByPk(id);

    const deliveryman = await Deliveryman.findByPk(order.deliveryman_id);

    const recipient = await Recipient.findByPk(order.recipient_id);

    await Queue.add(CanceledOrderMail.key, {
      deliveryman,
      recipient,
      deliveryProblems,
      order,
    });

    order.destroy();

    return res.json({ message: 'Order successfully deleted' });
  }
}

export default new DeliveryProblemsIdController();
