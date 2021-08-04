import React from 'react';
import PropTypes from 'prop-types';
import TableItems from './TableItems';
import NewItem from './NewItem';
import EditItem from './EditItem';

export default function ContentPage(props) {
  ContentPage.propTypes = {
    getPage: PropTypes.string,
  };
  return (
    <React.Fragment>
      {props.getPage === 'LIST' && <TableItems {...props} />}
      {props.getPage === 'NEW' && <NewItem {...props} />}
      {props.getPage === 'EDIT' && <EditItem {...props} />}
    </React.Fragment>
  );
}
