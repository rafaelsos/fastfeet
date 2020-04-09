import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet-logo.png';
import { Container, Content } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  password: Yup.string().required('Senha é obrigatório.'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="FastFeet" />

        <Form schema={schema} onSubmit={handleSubmit}>
          <p>SEU E-MAIL</p>
          <Input name="email" type="email" placeholder="exemplo@fastfeet.com" />

          <p>SUA SENHA</p>
          <Input name="password" type="password" placeholder="******" />

          <button type="submit">
            {loading ? 'Carregando...' : 'Acessar Sistema'}
          </button>
        </Form>
      </Content>
    </Container>
  );
}
