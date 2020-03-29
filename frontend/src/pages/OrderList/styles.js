import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export const Table = styled.div`
  margin-top: 30px;
  border-radius: 4px;

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 20px;

    thead th {
      padding: 0 15px;
      text-align: start;

      &:last-child {
        text-align: right;
      }
    }

    tbody td {
      padding: 0 15px;
      height: 50px;
      text-align: start;
      background: #fff;
      color: #999;
      font-size: 14px;
      font-weight: 500;

      &:last-child {
        text-align: right;
      }
    }
  }
`;
