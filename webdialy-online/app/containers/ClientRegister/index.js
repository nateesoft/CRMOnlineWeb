/**
 *
 * ClientRegister
 *
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import useCookie, { setCookie } from 'react-use-cookie';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as appConstants from 'containers/App/constants';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import { Container, Topic, Panel } from './styles';

export function ClientRegister(props) {
  const { history, location } = props;
  useInjectReducer({ key: 'clientRegister', reducer });
  useInjectSaga({ key: 'clientRegister', saga });

  const queryDatabaseParam = new URLSearchParams(location.search).get('data');
  const database = useCookie('database', null);
  const [tokenRegister, setTokenRegister] = useState(queryDatabaseParam || '');
  const [showWarning, setShowWarning] = useState(false);

  const saveCookieRegister = () => {
    if (tokenRegister) {
      setCookie('database', JSON.stringify(tokenRegister));
      history.push(`${appConstants.publicPath}/login`);
    } else {
      setShowWarning(true);
    }
  };

  const handleInput = data => {
    setTokenRegister(data);
    setShowWarning(false);
  };

  useEffect(() => {
    props.onInitLoad();
  }, []);

  if (database[0]) {
    return <Redirect to={`${appConstants.publicPath}/login`} />;
  }

  return (
    <Container>
      <Helmet>
        <title>Client Register</title>
      </Helmet>
      <div style={{ padding: 10 }}>
        <Topic>Client Register</Topic>
        <Panel style={{ background: 'snow', border: '1px solid #ccc', padding: '10px' }}>
          <div>ลงทะเบียนสำหรับเปิดเข้าใช้งานระบบ</div>
          <div>
            <b>Token to register</b>
          </div>
          <div style={{ padding: '10px', margin: '10px' }}>
            <select
              value={tokenRegister}
              onChange={e => handleInput(e.target.value)}
              style={{ height: '35px', width: '100%', boxShadow: '3px 3px #000' }}
            >
              <option value="">เลือกร้านค้าของท่าน</option>
              {props.dbList &&
                props.dbList.map((item, index) => (
                  <option key={item.database} value={item.encrypt}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div style={{ marginTop: 10 }} align="center">
            <button id="btnRegister" type="button" onClick={() => saveCookieRegister()}>
              Register/ ลงทะเบีบน
            </button>
          </div>
          {showWarning && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              *กรุณาระบุข้อมูล Token เพื่อลงทะเบียน
            </div>
          )}
        </Panel>
      </div>
    </Container>
  );
}

ClientRegister.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  onInitLoad: PropTypes.func,
  dbList: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  clientRegister: selectors.makeSelectClientRegister(),
  dbList: selectors.makeSelectDBListItems(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onInitLoad: () => dispatch(actions.initLoad()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ClientRegister);
