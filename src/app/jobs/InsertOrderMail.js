import Mail from '../../lib/Mail';

class InsertOrderMail {
  get key() {
    return 'InsertOrderMail';
  }

  async handle({ data }) {
    const { deliveryman, recipient } = data;

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
  }
}

export default new InsertOrderMail();
