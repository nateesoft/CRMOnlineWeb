/**
 *
 * CheckCarts
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mainSelectors from 'containers/MainLayoutApp/selectors';
import * as appSelectors from 'containers/App/selectors';
import * as selectors from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import saga from './saga';
import TabLayout from './components/TabLayout';

const useStyles = makeStyles(() => ({
  root: {
    overflow: 'auto',
    marginBottom: '50px',
  },
}));

export function CheckCarts(props) {
  useInjectReducer({ key: 'checkCarts', reducer });
  useInjectSaga({ key: 'checkCarts', saga });
  const classes = useStyles();

  useEffect(() => {
    props.onInitLoad();
  }, []);

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={12}>
        <TabLayout {...props} />
      </Grid>
    </Grid>
  );
}

CheckCarts.propTypes = {
  onChangePage: PropTypes.func,
  onInitLoad: PropTypes.func,
  onLoadView: PropTypes.func,
  onSearch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  getPage: selectors.makeSelectPage(),
  getList: selectors.makeSelectListItems(),
  getData: selectors.makeSelectForm(),
  response: selectors.makeSelectResponse(),
  leftMenu: appSelectors.makeSelectLeftMenu(),
  profile: mainSelectors.makeSelectProfile(),
  showAlertResponse: selectors.makeSelectResponse(),
});

function mapDispatchToProps(dispatch) {
  return {
    onInitLoad: () => dispatch(actions.initLoad()),
    onChangePage: pageAt => dispatch(actions.changePage(pageAt)),
    onLoadView: item => dispatch(actions.loadView(item)),
    onSearch: (key, value) => dispatch(actions.search({ key, value })),
    onUpdateShoppingStep: data => dispatch(actions.updateShoppingStep(data)),
    onLoadViewOrder: data => dispatch(actions.loadViewOrder(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CheckCarts);
