/**
 *
 * Shopping
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mainSelectors from 'containers/MainLayoutApp/selectors';
import * as appSelectors from 'containers/App/selectors';
import MainComponents from './components';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

export function Shopping(props) {
  useInjectReducer({ key: 'shopping', reducer });
  useInjectSaga({ key: 'shopping', saga });

  useEffect(() => {
    const { cart_no: cartNo } = props.match.params;
    props.initLoadCart(cartNo);
    props.onLoadProduct();
  }, []);

  return <MainComponents {...props} />;
}

Shopping.propTypes = {
  onLoadProduct: PropTypes.func,
  initLoadCart: PropTypes.func,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  shopping: selectors.makeSelectShopping(),
  productList: selectors.makeSelectProductList(),
  profile: mainSelectors.makeSelectProfile(),
  cart: selectors.makeSelectCart(),
  leftMenu: appSelectors.makeSelectLeftMenu(),
});

function mapDispatchToProps(dispatch) {
  return {
    initLoadCart: cartNo => dispatch(actions.loadCart(cartNo)),
    onLoadProduct: () => dispatch(actions.loadProduct()),
    onAddCartItem: item => dispatch(actions.createItemCart(item)),
    onUpdateCartItem: item => dispatch(actions.updateItemCart(item)),
    onSearch: data => dispatch(actions.searchProduct(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Shopping);
