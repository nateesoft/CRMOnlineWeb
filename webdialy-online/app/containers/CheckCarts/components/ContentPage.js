import React from 'react';
import PropTypes from 'prop-types';
import TableItems from './TableItems';
import ViewItem from './ViewItem';

export default function ContentPage(props) {
  ContentPage.propTypes = {
    getPage: PropTypes.string,
  };

  return (
    <>
      {props.getPage === 'LIST' && <TableItems {...props} />}
      {props.getPage === 'VIEW' && <ViewItem {...props} />}
    </>
  );
}
