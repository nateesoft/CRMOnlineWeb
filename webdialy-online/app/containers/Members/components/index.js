import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import TableItems from './TableItems';
import EditItem from './EditItem';
import ViewItem from './ViewItem';

export default function ContentPage(props) {
  ContentPage.propTypes = {
    getPage: PropTypes.string,
  };

  return (
    <>
      <Helmet>
        <title>Member</title>
      </Helmet>
      {props.getPage === 'LIST' && <TableItems {...props} />}
      {props.getPage === 'EDIT' && <EditItem {...props} />}
      {props.getPage === 'VIEW' && <ViewItem {...props} />}
    </>
  );
}
