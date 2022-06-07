/**
 *
 * UsePromotion
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mainSelectors from 'containers/MainLayoutApp/selectors';
import * as appSelectors from 'containers/App/selectors';
import * as selectors from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import MainComponents from './components';
import saga from './saga';

const useStyles = makeStyles(() => ({
  root: {
    overflow: 'auto',
  },
}));

export function UsePromotion(props) {
  useInjectReducer({ key: 'usePromotion', reducer });
  useInjectSaga({ key: 'usePromotion', saga });
  const classes = useStyles();

  useEffect(() => {
    props.onInitLoad();
  }, []);

  return (
    <Grid container spacing={1} className={classes.root}>
      <MainComponents {...props} />
    </Grid>
  );
}

UsePromotion.propTypes = {
  onChangePage: PropTypes.func,
  onInitLoad: PropTypes.func,
  onSearch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  getPage: selectors.makeSelectPage(),
  getList: selectors.makeSelectListItems(),
  getData: selectors.makeSelectForm(),
  response: selectors.makeSelectResponse(),
  leftMenu: appSelectors.makeSelectLeftMenu(),
  profile: mainSelectors.makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    onInitLoad: () => dispatch(actions.initLoad()),
    onChangePage: pageAt => dispatch(actions.changePage(pageAt)),
    onSearch: (key, value) => dispatch(actions.search({ key, value })),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UsePromotion);
