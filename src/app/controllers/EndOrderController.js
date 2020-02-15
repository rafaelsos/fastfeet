import * as Yup from 'yup';
import { Op } from 'sequelize';
import Order from '../models/Order';
import Signature from '../models/Signature';

class EndOrderController {
  async update(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { deliveryman_id } = req.query;

    /**
     * devo validar se tem signature?
     */
    const { originalname: name, filename: path } = req.file;

    const signature = await Signature.create({
      name,
      path,
    });

    /**
     * verify exist order
     */
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'Order does not exist' });
    }

    /**
     * First you must withdraw the order
     */
    if (order.start_date === null) {
      return res
        .status(400)
        .json({ error: 'First you must withdraw the order' });
    }

    /**
     * check if the order has already been delivered
     */
    const checkEndtOrder = await Order.findOne({
      where: {
        id,
        end_date: { [Op.ne]: null },
      },
    });

    if (checkEndtOrder) {
      return res
        .status(400)
        .json({ error: 'Order has already been delivered' });
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
      signature_id: signature.id,
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
