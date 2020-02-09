import * as Yup from 'yup';
import Couriers from '../models/Couriers';

class CouriersController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const courierExists = await Couriers.findOne({
      where: { email: req.body.email },
    });

    if (courierExists) {
      return res.status(400).json({ error: 'Delivery man alredy exists' });
    }

    const { id, name, email } = await Couriers.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const couriers = await Couriers.findAll({
      attributes: ['id', 'name', 'email'],
      order: ['name'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(couriers);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const courier = await Couriers.findByPk(req.params.id);

    if (!courier) {
      return res.status(400).json({ error: 'Delivery man does not exists' });
    }

    const { email } = req.body;

    if (email && email !== courier.email) {
      const courierExist = await Couriers.findOne({ where: { email } });

      if (courierExist) {
        return res.status(400).json({ error: 'Delivery man alredy exists.' });
      }
    }

    const courierUp = await courier.update(req.body);

    return res.json({
      id: courierUp.id,
      name: courierUp.name,
      email: courierUp.email,
    });
  }

  async delete(req, res) {
    const courier = await Couriers.findByPk(req.params.id);

    if (!courier) {
      return res.status(400).json({ error: 'Delivery man does not exists' });
    }

    await courier.destroy();

    return res
      .status(200)
      .json({ sucess: 'Delivery man successfully deleted' });
  }
}

export default new CouriersController();
