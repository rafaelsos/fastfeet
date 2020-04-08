import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Container, Content } from './styles';

import logo from '~/assets/fastfeet-logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  password: Yup.string().required('Senha é obrigatório.'),
});

export default function SignIn() {
  function handleSubmit() { }

  return (
    <Container>
      <Content>
        <img src={logo} alt="FastFeet" />

        <Form schema={schema} onSubmit={handleSubmit}>
          <p>SEU E-MAIL</p>
          <Input name="email" type="email" placeholder="exemplo@fastfeet.com" />

          <p>SUA SENHA</p>
          <Input name="password" type="password" placeholder="******" />

          <button type="submit">Acessar sistema</button>
        </Form>
      </Content>
    </Container>
  );
}
