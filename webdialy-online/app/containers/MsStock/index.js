/**
 *
 * MsStock
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
import MainLayoutApp from 'containers/MainLayoutApp';
import * as mainSelectors from 'containers/MainLayoutApp/selectors';
import * as appSelectors from 'containers/App/selectors';
import * as selectors from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import ContentPage from './ContentPage';
import saga from './saga';

const useStyles = makeStyles(() => ({
  root: {
    overflow: 'auto',
  },
}));

export function MsStock(props) {
  useInjectReducer({ key: 'msStock', reducer });
  useInjectSaga({ key: 'msStock', saga });
  const classes = useStyles();

  useEffect(() => {
    props.onInitLoad();
  }, []);

  return (
    <MainLayoutApp title="Stock" {...props}>
      <Grid container spacing={1} className={classes.root}>
        <ContentPage {...props} />
      </Grid>
    </MainLayoutApp>
  );
}

MsStock.propTypes = {
  onChangePage: PropTypes.func,
  onInitLoad: PropTypes.func,
  onLoadEdit: PropTypes.func,
  onCreateItem: PropTypes.func,
  onUpdateItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
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
    onCreateItem: data => dispatch(actions.createItem(data)),
    onUpdateItem: data => dispatch(actions.updateItem(data)),
    onDeleteItem: id => dispatch(actions.deleteItem(id)),
    onChangePage: pageAt => dispatch(actions.changePage(pageAt)),
    onLoadEdit: item => dispatch(actions.loadEdit(item)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MsStock);
