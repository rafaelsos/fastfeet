import React from 'react';

import { Container, Content } from './styles';

import logo from '~/assets/fastfeet-logo.png';

export default function SignIn() {
  return (
    <Container>
      <Content>
        <img src={logo} alt="FastFeet" />

        <form>
          <p>SEU E-MAIL</p>
          <input type="email" placeholder="exemplo@fastfeet.com" />

          <p>SUA SENHA</p>
          <input type="password" placeholder="******" />

          <button type="submit">Acessar sistema</button>
        </form>
      </Content>
    </Container>
  );
}
