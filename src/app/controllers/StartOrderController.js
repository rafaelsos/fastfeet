import { Op } from 'sequelize';
import { lightFormat, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import * as Yup from 'yup';
import Order from '../models/Order';

class StartOrderController {
  async update(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
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
     * check if order has already been withdrawn
     */

    const checkStartOrder = await Order.findOne({
      where: {
        id,
        start_date: { [Op.ne]: null },
      },
    });

    if (checkStartOrder) {
      return res
        .status(400)
        .json({ error: 'Order has already been withdrawn' });
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
        .json({ error: 'delivery person cannot pick up order' });
    }

    /**
     * validate withdrawal interval, can only be from 08:00 to 18:00
     */
    const date = new Date();
    const dateformat = lightFormat(date, 'yyyy-MM-dd');

    const isInterval = isWithinInterval(date, {
      start: new Date(`${dateformat} 00:00`),
      end: new Date(`${dateformat} 23:59`),
    });

    if (!isInterval) {
      return res.status(400).json({
        warning: 'Orders can only be picked up between 08:00 and 18:00',
      });
    }

    /**
     * deliveryman can only make 5 withdrawals per day
     */
    const startorders = await Order.findAll({
      where: {
        deliveryman_id,
        // start_date: { [Op.eq]: null },
        start_date: {
          [Op.between]: [startOfDay(date), endOfDay(date)],
        },
      },
    });

    if (startorders.length === 5) {
      return res.status(400).json({
        warning: 'Deliveryman can only make 5 withdrawals per day',
      });
    }

    const { product, recipient_id, start_date, end_date } = await order.update({
      ...order,
      start_date: date,
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

export default new StartOrderController();
