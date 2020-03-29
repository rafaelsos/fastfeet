import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, Menu, Logo } from './styles';

import logo from '~/assets/fastfeet-logo.png';

export default function Header() {
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
            <Link to="/">ENCOMENDAS</Link>
            <Link to="/">ENTREGADORES</Link>
            <Link to="/">DESTINATÁRIOS</Link>
            <Link to="/">PROBLEMAS</Link>
          </Menu>
        </nav>

        <aside>
          <strong>Admin FastFeet</strong>
          <Link to="/">Sair do sistema</Link> {/* colocar um icone de logout */}
        </aside>
      </Content>
    </Container>
  );
}
