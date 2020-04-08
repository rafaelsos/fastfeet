import styled from 'styled-components';
// import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  margin: 0 auto;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 30px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    @media all and (max-width: 600px) {
      img {
        height: 25px;
      }
    }

    @media all and (max-width: 500px) {
      img {
        height: 20px;
      }
    }
  }

  aside {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    a {
      margin-top: 10px;
      color: #de3b3b;
      font-weight: bold;
    }

    @media all and (max-width: 600px) {
      font-size: 1px;
      justify-content: flex-end;
      align-items: flex-end;
    }
    @media all and (max-width: 500px) {
      font-size: 12px;
      justify-content: flex-end;
      align-items: flex-end;
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
  display: flex;
  flex-wrap: wrap;
  flex-direction: center;
  justify-content: center;
  padding-left: 15px;

  a {
    display: block;
    /* background: tomato; */
    font-size: 15px;
    color: #333;
    font-weight: bold;
    margin-right: 10px;

    &:hover {
      background: rgba(255, 255, 255, 0.9);
      color: #111;
    }
  }
  a + a {
    color: #999999;
  }

  @media all and (max-width: 500px) {
    justify-content: flex-start;
    a {
      font-size: 13px;
    }
  }
`;
