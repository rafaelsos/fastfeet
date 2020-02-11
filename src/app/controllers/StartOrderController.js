/*
import isWithinInterval from 'date-fns/isWithinInterval';
import getHours from 'date-fns/getHours';
import getDate from 'date-fns/getDate';
*/
import { lightFormat, isWithinInterval } from 'date-fns';
import Order from '../models/Order';
// import Deliveryman from '../models/Deliveryman';
// import Recipient from '../models/Recipient';

class StartOrderController {
  async update(req, res) {
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
      start: new Date(`${dateformat} 01:00`),
      end: new Date(`${dateformat} 18:00`),
    });

    if (!isInterval) {
      return res.status(400).json({
        warning: 'Orders can only be picked up between 08:00 and 18:00',
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
