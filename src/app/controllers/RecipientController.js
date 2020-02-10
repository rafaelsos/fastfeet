import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async index(req, res) {
    const recipients = await Recipient.findAll({
      order: ['id'],
    });

    return res.json(recipients);
  }

  async update(req, res) {
    // const recipient = await Recipient.findOne({ where: { id: req.params.id } });
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient does not exists.' });
    }

    const recipientUp = await recipient.update(req.body);

    return res.json(recipientUp);
  }
}

export default new RecipientController();
