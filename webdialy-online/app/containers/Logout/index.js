/**
 *
 * Logout
 *
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import useCookie from 'react-use-cookie';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import LockIcon from '@material-ui/icons/Lock';
import ButtonLink from 'components/ButtonLink';
import Button from '@material-ui/core/Button';
import { checkLogout } from 'containers/Login/actions';
import * as appActions from 'containers/App/actions';
import * as appConstant from 'containers/App/constants';
import LogoutIcon from 'images/logout.png';
import * as selectors from './selectors';
import messages from './messages';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  text-align: center;
  margin-top: 50px;
`;

export function Logout(props) {
  const [token, setToken] = useCookie('token', '');

  useEffect(() => {
    if (token) {
      props.onCheckLogout();
      setToken('');
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Logout</title>
      </Helmet>
      <Wrapper>
        <img src={LogoutIcon} border={0} width={100} alt="" />
        <h4>
          <FormattedMessage {...messages.header} />
        </h4>
        <ButtonLink to={`${appConstant.publicPath}/login`}>
          <Button color="primary" size="large" startIcon={<LockIcon />}>
            <FormattedMessage {...messages.loginButton} />
          </Button>
        </ButtonLink>
      </Wrapper>
    </>
  );
}

Logout.propTypes = {
  onCheckLogout: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  logout: selectors.makeSelectLogout(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCheckLogout: email => {
      dispatch(checkLogout(email));
      dispatch(appActions.clearMenu());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Logout);
