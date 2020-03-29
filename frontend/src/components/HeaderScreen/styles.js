import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 22px;
  margin-top: 30px;
  font-weight: bold;
`;

export const Options = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    height: 35px;
    width: 145px;
    text-align: center;
    border-radius: 4px;
    border: none;
    background: #7d40e7;
    color: #fff;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.12, '#7d40e7')};
    }

    svg {
      margin-right: 5px;
    }
  }
`;

export const Search = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    height: 35px;
    width: 220px;
    text-align: center;
    border-radius: 4px;
    border: none;
    ::placeholder {
      color: #999;
    }
  }

  svg {
    position: absolute;
    left: 10px;
  }
`;
