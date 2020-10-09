/**
 *
 * MsCompany
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as selectors from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import ContentPage from './ContentPage';
import saga from './saga';

export function MsCompany(props) {
  useInjectReducer({ key: 'msCompany', reducer });
  useInjectSaga({ key: 'msCompany', saga });

  useEffect(() => {
    props.onInitLoad();
  }, []);

  return (
    <ContentPage {...props} />
  );
}

MsCompany.propTypes = {
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

export default compose(withConnect)(MsCompany);
