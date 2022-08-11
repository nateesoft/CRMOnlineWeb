/**
 *
 * MsProduct
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

export function MsProduct(props) {
  useInjectReducer({ key: 'msProduct', reducer });
  useInjectSaga({ key: 'msProduct', saga });

  const classes = useStyles();

  useEffect(() => {
    props.onInitLoad();
    props.loadProductGroupList();
  }, []);

  return (
    <Grid container spacing={1} className={classes.root}>
      <MainComponents {...props} />
    </Grid>
  );
}

MsProduct.propTypes = {
  onChangePage: PropTypes.func,
  onInitLoad: PropTypes.func,
  onLoadEdit: PropTypes.func,
  onCreateItem: PropTypes.func,
  onUpdateItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  loadProductGroupList: PropTypes.func,
  onSearch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  getPage: selectors.makeSelectPage(),
  getList: selectors.makeSelectListItems(),
  getData: selectors.makeSelectForm(),
  response: selectors.makeSelectResponse(),
  leftMenu: appSelectors.makeSelectLeftMenu(),
  profile: mainSelectors.makeSelectProfile(),
  productImports: selectors.makeSelectProductImport(),
  groupList: selectors.makeSelectProductGroupList(),
  stockList: selectors.makeSelectStockList(),
  uploadSuccess: selectors.makeGetUploadStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onInitLoad: () => dispatch(actions.initLoad()),
    onCreateItem: data => dispatch(actions.createItem(data)),
    onUpdateItem: data => dispatch(actions.updateItem(data)),
    onDeleteItem: id => dispatch(actions.deleteItem(id)),
    onChangePage: pageAt => dispatch(actions.changePage(pageAt)),
    onLoadEdit: item => dispatch(actions.loadEdit(item)),
    onUploadImage: file => dispatch(actions.uploadImage(file)),
    onLoadDataFromFile: data => dispatch(actions.loadDataFromFile(data)),
    onSaveDataImport: () => dispatch(actions.saveDataImport()),
    onSetHeaders: headers => dispatch(actions.setHeaders(headers)),
    loadProductGroupList: () => dispatch(actions.loadProductGroupList()),
    onSearch: (key, value) => dispatch(actions.search({ key, value })),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MsProduct);
