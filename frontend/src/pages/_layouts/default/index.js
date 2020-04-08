import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';
import { ContainerDefault } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <ContainerDefault>
      <Header />
      {children}
    </ContainerDefault>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
