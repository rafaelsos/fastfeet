import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdMoreHoriz,
  MdVisibility,
  MdCreate,
  MdDeleteForever,
} from 'react-icons/md';

import { Container, TableActions } from './styles';

export default function TableAction() {
  const [visible, setVisible] = useState(false);

  function handleVisibleActions() {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }

  return (
    <Container>
      <button onClick={handleVisibleActions} type="button">
        <MdMoreHoriz size={25} color="#999" />
      </button>

      <TableActions visible={visible}>
        <div>
          <button type="button" onClick={() => {}}>
            <MdVisibility size={18} color="#8E5BE8" />
            Visualizar
          </button>
        </div>
        <div>
          <Link to="/">
            <MdCreate size={18} color="#4D85EE" />
            Editar
          </Link>
        </div>
        <div>
          <button type="button" onClick={() => {}}>
            <MdDeleteForever size={18} color="#DE3B3B" />
            Excluir
          </button>
        </div>
      </TableActions>
    </Container>
  );
}
