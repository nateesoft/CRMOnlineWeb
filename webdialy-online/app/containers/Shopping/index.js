/**
 *
 * Shopping
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ShoppingContent from './ShoppingContent';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectShopping from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Shopping() {
  useInjectReducer({ key: 'shopping', reducer });
  useInjectSaga({ key: 'shopping', saga });

  return (
    <div style={{width: '100%'}}>
      <ShoppingContent />
    </div>
  );
}

Shopping.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  shopping: makeSelectShopping(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Shopping);