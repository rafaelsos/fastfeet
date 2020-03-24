import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  background: #7159c1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  background: #fff;
  padding: 20px;
  border-radius: 4px;

  img {
    margin-top: 15px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 15px;

    p {
      display: flex;
      margin-top: 30px;
      flex-direction: row;
      font-size: 16px;
      font-weight: bold;
    }

    input {
      margin-top: 10px;
      background: #fff;
      border: 1px solid #999;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #111;
      &::placeholder {
        color: #999;
      }
    }

    button {
      margin: 15px 0 0;
      height: 44px;
      background: #7159c1;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#ab59c1')};
      }
    }
  }
`;
