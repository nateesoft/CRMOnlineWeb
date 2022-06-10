import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import TabLayout from './TabLayout';
import ViewItem from './ViewItem';

export default function ContentPage(props) {
  ContentPage.propTypes = {
    getPage: PropTypes.string,
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Track carts</title>
      </Helmet>
      {props.getPage === 'LIST' && <TabLayout {...props} />}
      {props.getPage === 'VIEW' && <ViewItem {...props} />}
    </React.Fragment>
  );
}
