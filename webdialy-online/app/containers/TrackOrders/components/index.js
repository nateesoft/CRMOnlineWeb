import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import TableItems from './TableItems';
import ViewItem from './ViewItem';

export default function ContentPage(props) {
  ContentPage.propTypes = {
    getPage: PropTypes.string,
  };

  return (
    <>
      <Helmet>
        <title>Track Order</title>
      </Helmet>
      {props.getPage === 'LIST' && <TableItems {...props} />}
      {props.getPage === 'VIEW' && <ViewItem {...props} />}
    </>
  );
}
