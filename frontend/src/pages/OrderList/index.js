import React from 'react';

import { Container, Table } from './styles';

import TableAction from '~/components/TableAction';
import HeaderScreen from '~/components/HeaderScreen';

export default function OrderList() {
  const data = [
    {
      id: 2,
      product: 'produto 1',
      start_date: '2020-02-12T03:26:47.018Z',
      end_date: '2020-02-12T02:09:01.639Z',
      recipient: {
        name: 'Karine Almeida fernandes',
        street: 'rua david Thomaz pereira',
        number: 415,
        city: 'Joinville',
        state: 'sc',
        zipcode: '89226-020',
      },
      deliveryman: {
        name: 'Adilson Roberts',
        email: 'Adilson@gmail.com',
      },
    },
    {
      id: 3,
      product: 'produto 2',
      start_date: '2020-02-12T03:47:29.049Z',
      end_date: '2020-02-12T05:05:06.814Z',
      recipient: {
        name: 'Karine Almeida fernandes',
        street: 'rua david Thomaz pereira',
        number: 415,
        city: 'Joinville',
        state: 'sc',
        zipcode: '89226-020',
      },
      deliveryman: {
        name: 'Adilson Roberts',
        email: 'Adilson@gmail.com',
      },
    },
  ];

  return (
    <Container>
      <HeaderScreen
        title="Gerenciando Encomendas"
        descriptionSearch="encomendas"
      />

      <Table>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estados</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {data.map((order) => (
              <tr key={String(order.id)}>
                <td>#{order.id}</td>
                <td>{order.recipient.name}</td>
                <td>{order.deliveryman.name}</td>
                <td>{order.recipient.city}</td>
                <td>{order.recipient.state}</td>
                <td>Pendente</td>
                <td>
                  <TableAction />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>
    </Container>
  );
}
