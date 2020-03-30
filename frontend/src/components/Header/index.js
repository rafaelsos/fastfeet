import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Content, Menu, Logo } from './styles';

import logo from '~/assets/fastfeet-logo.png';

export default function Header() {
  const email = useSelector((state) => state.user);
  console.tron.log(email);

  return (
    <Container>
      <Content>
        <nav>
          <Logo>
            <Link to="/orderlist">
              <img src={logo} alt="FastFeet" />
            </Link>
          </Logo>
          <Menu>
            <Link to="/orderlist">ENCOMENDAS</Link>
            <Link to="/">ENTREGADORES</Link>
            <Link to="/">DESTINATÁRIOS</Link>
            <Link to="/">PROBLEMAS</Link>
          </Menu>
        </nav>

        <aside>
          <strong>{email}</strong>
          <Link to="/">Sair do sistema</Link> {/* colocar um icone de logout */}
        </aside>
      </Content>
    </Container>
  );
}
