import React from 'react';
import PropTypes from 'prop-types';

import { ContainerAuth } from './styles';

export default function AuthLayout({ children }) {
  return <ContainerAuth>{children}</ContainerAuth>;
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
