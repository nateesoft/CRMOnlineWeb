import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from 'containers/Authentication';
import Login from 'containers/Login/Loadable';
import Logout from 'containers/Logout/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import LineLogin from 'containers/LineLogin/Loadable';
import Register from 'containers/Register/Loadable';
import ForgotPassword from 'containers/ForgotPassword/Loadable';
import RecoverPassword from 'containers/RecoverPassword/Loadable';
import Profile from 'containers/Profile/Loadable';
import ProfileEdit from 'containers/ProfileEdit/Loadable';
import ProfileShipping from 'containers/ProfileShipping/Loadable';
import ProfileChangePwd from 'containers/ProfileChangePwd/Loadable';
import Members from 'containers/Members/Loadable';
import MsCompany from 'containers/MsCompany/Loadable';
import MsBranch from 'containers/MsBranch/Loadable';
import MsProduct from 'containers/MsProduct/Loadable';
import MsProductGroup from 'containers/MsProductGroup/Loadable';
import MsStock from 'containers/MsStock/Loadable';
import MsPromotion from 'containers/MsPromotion/Loadable';
import MsRole from 'containers/MsRole/Loadable';
import Shopping from 'containers/Shopping/Loadable';
import CheckoutOrder from 'containers/CheckoutOrder/Loadable';
import GoogleMap from 'containers/GoogleMap/Loadable';
import MemberTracking from 'containers/MemberTracking/Loadable';
import CheckCarts from 'containers/CheckCarts/Loadable';
import MemberOrdersConfirm from 'containers/MemberOrdersConfirm/Loadable';
import DatabaseConfig from 'containers/DatabaseConfig/Loadable';
import UsePromotion from 'containers/UsePromotion/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AccessDeniedPage from 'containers/AccessDeniedPage/Loadable';

import * as path from '../constants';

export default function NewLayout() {
  return (
    <Switch>
      <Route exact path={`${path.publicPath}/`} component={Login} />
      <Route path={path.PATH_LOGIN} component={Login} />
      <Route path={path.PATH_LOGOUT} component={Logout} />
      <Route path={path.PATH_REGISTER} component={Register} />
      <Route path={path.PATH_FORGOT_PWD} component={ForgotPassword} />
      <Route path={path.PATH_RECOVER_PWD} component={RecoverPassword} />
      <Route path={path.PATH_TEST_GOOGLE_MAP} component={GoogleMap} />
      <Route path={path.PATH_MEMBER_ORDERS_CONFIRM} component={MemberOrdersConfirm} />
      <PrivateRoute path={path.PATH_DASHBOARD} component={Dashboard} />
      <PrivateRoute path={path.PATH_PROFILE} component={Profile} />
      <PrivateRoute path={path.PATH_PROFILE_EDIT} component={ProfileEdit} />
      <PrivateRoute path={path.PATH_PROFILE_SHIPPING} component={ProfileShipping} />
      <PrivateRoute path={path.PATH_PROFILE_CHANGE_PWD} component={ProfileChangePwd} />
      <PrivateRoute path={path.PATH_MEMBER} component={Members} />
      <PrivateRoute path={path.PATH_SHOPPING} component={Shopping} />
      <PrivateRoute path={path.PATH_CHECKOUT_ORDER} component={CheckoutOrder} />
      <PrivateRoute path={path.PATH_LINE_LOGIN} component={LineLogin} />
      <PrivateRoute path={path.PATH_MS_COMPANY} component={MsCompany} />
      <PrivateRoute path={path.PATH_MS_BRANCH} component={MsBranch} />
      <PrivateRoute path={path.PATH_MS_PRODUCT} component={MsProduct} />
      <PrivateRoute path={path.PATH_MS_PRODUCT_GROUP} component={MsProductGroup} />
      <PrivateRoute path={path.PATH_MS_STOCK} component={MsStock} />
      <PrivateRoute path={path.PATH_MS_ROLE} component={MsRole} />
      <PrivateRoute path={path.PATH_MS_PROMOTION} component={MsPromotion} />
      <PrivateRoute path={path.PATH_ORDERS_TRACKING} component={MemberTracking} />
      <PrivateRoute path={path.PATH_CHECK_CARTS} component={CheckCarts} />
      <PrivateRoute path={path.PATH_DATABASE} component={DatabaseConfig} />
      <PrivateRoute path={path.PATH_USE_PROMOTION} component={UsePromotion} />
      <Route path={path.PATH_ACCESS_DENIED} component={AccessDeniedPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
