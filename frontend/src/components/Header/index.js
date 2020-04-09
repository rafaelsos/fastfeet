import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet-logo.png';
import { Container, Content, Menu, Logo } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

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
          <strong>{profile.name}</strong>
          <button type="button" onClick={handleSignOut}>
            <FaSignOutAlt size={30} color="#111" />
          </button>{' '}
          {/* colocar um icone de logout */}
        </aside>
      </Content>
    </Container>
  );
}
