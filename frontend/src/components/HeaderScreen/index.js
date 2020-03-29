import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch, MdAdd } from 'react-icons/md';

import { Container, Title, Options, Search } from './styles';

export default function HeaderScreen({ title, descriptionSearch }) {
  return (
    <Container>
      <Title>{title}</Title>
      <Options>
        <Search>
          <MdSearch size={22} color="#999" />
          <input placeholder={`Buscar por ${descriptionSearch}`} />
        </Search>
        <button type="button">
          <MdAdd size={22} color="#fff" />
          CADASTRAR
        </button>
      </Options>
    </Container>
  );
}

HeaderScreen.propTypes = {
  title: PropTypes.string.isRequired,
  descriptionSearch: PropTypes.string.isRequired,
};
