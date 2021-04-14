/**
 *
 * MsPromotion
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { getCookie } from 'react-use-cookie';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import MainLayoutApp from 'containers/MainLayoutApp';
import * as mainSelectors from 'containers/MainLayoutApp/selectors';
import * as appConstants from 'containers/App/constants';
import * as appSelectors from 'containers/App/selectors';
import * as selectors from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import ContentPage from './ContentPage';
import saga from './saga';

const useStyles = makeStyles(() => ({
  root: {
    overflow: 'auto',
    width: '100vw',
  },
}));

export function MsPromotion(props) {
  useInjectReducer({ key: 'msPromotion', reducer });
  useInjectSaga({ key: 'msPromotion', saga });

  const classes = useStyles();
  const token = getCookie('token') || '';

  useEffect(() => {
    if (token) {
      props.onInitLoad();
    }
  }, []);

  if (!token) {
    return <Redirect to={`${appConstants.publicPath}/`} />;
  }

  return (
    <MainLayoutApp title="Promotion" {...props}>
      <Grid container spacing={1} className={classes.root}>
        <ContentPage {...props} />
      </Grid>
    </MainLayoutApp>
  );
}

MsPromotion.propTypes = {
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
    onUploadImage: file => dispatch(actions.uploadImage(file)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MsPromotion);
