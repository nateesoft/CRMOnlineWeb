import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import TableItems from './TableItems';

export default function ContentPage(props) {
  ContentPage.propTypes = {
    getPage: PropTypes.string,
  };

  return (
    <>
      <Helmet>
        <title>Use Promotion</title>
      </Helmet>
      {props.getPage === 'LIST' && <TableItems {...props} />}
    </>
  );
}
