import styled from 'styled-components';
// import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 30px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    a {
      margin-top: 10px;
      color: #de3b3b;
      font-weight: bold;
    }
  }
`;

export const Logo = styled.div`
  a {
    font-weight: bold;
    color: #7159c1;
  }
`;

export const Menu = styled.div`
  padding-left: 15px;

  a {
    font-size: 15px;
    color: #111;
    font-weight: bold;
    margin-right: 10px;
  }
  a + a {
    color: #999999;
  }
`;
