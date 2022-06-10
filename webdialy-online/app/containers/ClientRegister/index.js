/**
 *
 * ClientRegister
 *
 */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import useCookie, { setCookie } from 'react-use-cookie';
import { Redirect, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as appConstants from 'containers/App/constants';
import makeSelectClientRegister from './selectors';
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
        <Panel>
          <div>ลงทะเบียนสำหรับเปิดเข้าใช้งานระบบ</div>
          <div>Token to register</div>
          <div>
            <input
              id="txtToken"
              type="text"
              value={tokenRegister}
              onChange={e => handleInput(e.target.value)}
              autoFocus
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <button id="btnRegister" type="button" onClick={() => saveCookieRegister()}>
              Register
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

ClientRegister.propTypes = {};

const mapStateToProps = createStructuredSelector({
  clientRegister: makeSelectClientRegister(),
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

export default compose(withConnect)(ClientRegister);
