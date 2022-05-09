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
import { Redirect } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as appConstants from 'containers/App/constants';
import makeSelectClientRegister from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Container, Topic, Panel } from './styles';

export function ClientRegister() {
  useInjectReducer({ key: 'clientRegister', reducer });
  useInjectSaga({ key: 'clientRegister', saga });

  const database = useCookie('database', null);
  const [tokenRegister, setTokenRegister] = useState('');

  const saveCookieRegister = () => {
    setCookie('database', JSON.stringify(tokenRegister));
    window.location.replace('login');
  };

  if (database[0]) {
    return <Redirect to={`${appConstants.publicPath}/login`} />;
  }

  return (
    <Container>
      <div style={{ padding: 10 }}>
        <Topic>Client Register</Topic>
        <Panel>
          <div>ลงทะเบียนสำหรับเปิดเข้าใช้งานระบบ</div>
          <div>Token to register</div>
          <div>
            <input
              type="text"
              value={tokenRegister}
              onChange={e => setTokenRegister(e.target.value)}
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <button type="button" onClick={() => saveCookieRegister()}>
              Register
            </button>
          </div>
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
