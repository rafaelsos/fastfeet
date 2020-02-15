import Mail from '../../lib/Mail';

class CanceledOrderMail {
  get key() {
    return 'CanceledOrderMail';
  }

  async handle({ data }) {
    const { deliveryman, recipient, deliveryProblems, order } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Encomenda Cancelada',
      template: 'canceledOrder',
      context: {
        deliveryman: deliveryman.name,
        orderId: order.id,
        problem: deliveryProblems.description,
        canceled_at: order.canceled_at,
        product: order.product,
        recipient: recipient.name,
      },
    });
  }
}

export default new CanceledOrderMail();
