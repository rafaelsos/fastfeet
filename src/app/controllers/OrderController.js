import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Order from '../models/Order';
import Mail from '../../lib/Mail';

class OrderController {
  async store(req, res) {
    const { recipient_id, deliveryman_id, product } = await Order.create(
      req.body
    );

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    const recipient = await Recipient.findByPk(recipient_id);

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Novo Produto aguardando retirada',
      template: 'insertorder',
      context: {
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        address: `Rua ${recipient.street},${recipient.number} , ${recipient.city} , ${recipient.state}, ${recipient.zipcode}`,
      },
    });

    return res.json({
      recipient_id,
      deliveryman_id,
      product,
    });
  }

  async index(req, res) {
    const orders = await Order.findAll({
      where: { canceled_at: null },
      attributes: ['id', 'product', 'start_date', 'end_date'],
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

  async update(req, res) {
    const { recipient_id, deliveryman_id } = req.body;

    /**
     * verify order exists
     */
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Order does not exists' });
    }

    /**
     * verify recipient exists
     */
    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    /**
     * verify deliveryman exists
     */
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery man does not exists' });
    }

    let orderUpdate = await order.update(req.body);

    if (!orderUpdate) {
      return res.status(400).json({ error: 'Error update' });
    }

    orderUpdate = await Order.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'product', 'start_date', 'end_date'],
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

    return res.json(orderUpdate);
  }

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Delivery man does not exists' });
    }

    await order.destroy();

    return res.status(200).json({ sucess: 'Order successfully deleted' });
  }
}

export default new OrderController();
