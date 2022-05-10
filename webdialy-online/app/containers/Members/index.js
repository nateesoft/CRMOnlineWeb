/**
 *
 * Members
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
import MainComponents from './components';
import saga from './saga';

const useStyles = makeStyles(() => ({
  root: {
    overflow: 'auto',
  },
}));

export function Members(props) {
  useInjectReducer({ key: 'members', reducer });
  useInjectSaga({ key: 'members', saga });
  const classes = useStyles();

  useEffect(() => {
    props.onInitLoad({ page: 1, limit: 20 });
    props.onLoadRoles();
  }, []);

  return (
    <MainLayoutApp title="MemberList" {...props}>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12}>
          <MainComponents {...props} />
        </Grid>
      </Grid>
    </MainLayoutApp>
  );
}

Members.propTypes = {
  onChangePage: PropTypes.func,
  onInitLoad: PropTypes.func,
  onLoadEdit: PropTypes.func,
  onLoadView: PropTypes.func,
  onCreateItem: PropTypes.func,
  onUpdateItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onSearch: PropTypes.func,
  onLoadRoles: PropTypes.func,
  rolesList: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  getPage: selectors.makeSelectPage(),
  getList: selectors.makeSelectListItems(),
  getData: selectors.makeSelectForm(),
  response: selectors.makeSelectResponse(),
  rolesList: selectors.makeSelectRolesList(),
  leftMenu: appSelectors.makeSelectLeftMenu(),
  profile: mainSelectors.makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    onInitLoad: data => dispatch(actions.initLoad(data)),
    onCreateItem: data => dispatch(actions.createItem(data)),
    onUpdateItem: data => dispatch(actions.updateItem(data)),
    onDeleteItem: id => dispatch(actions.deleteItem(id)),
    onChangePage: pageAt => dispatch(actions.changePage(pageAt)),
    onLoadEdit: item => dispatch(actions.loadEdit(item)),
    onLoadView: item => dispatch(actions.loadView(item)),
    onLoadRoles: () => dispatch(actions.loadRoles()),
    onSearch: (key, value) => dispatch(actions.search({ key, value })),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Members);
