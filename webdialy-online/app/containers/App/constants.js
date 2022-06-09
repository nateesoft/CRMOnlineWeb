/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 */
const publicPath = process.env.REACT_APP_PUBLIC_PATH || '';
const serviceApiPath = process.env.REACT_APP_SERVICE_API_HOST || '';

const PATH_LOGIN = `${publicPath}/login`;
const PATH_LOGOUT = `${publicPath}/logout`;
const PATH_REGISTER = `${publicPath}/register`;
const PATH_FORGOT_PWD = `${publicPath}/forgot-password`;
const PATH_RECOVER_PWD = `${publicPath}/recover-password`;

const PATH_HOME = `${publicPath}/home/*`;
const PATH_DASHBOARD = `${publicPath}/home/dashboard`;
const PATH_LINE_LOGIN = `${publicPath}/home/line_login/:token`;
const PATH_PROFILE = `${publicPath}/home/profile`;
const PATH_PROFILE_EDIT = `${publicPath}/home/profile-edit`;
const PATH_PROFILE_SHIPPING = `${publicPath}/home/profile-shipping`;
const PATH_PROFILE_CHANGE_PWD = `${publicPath}/home/profile-change-pwd`;
const PATH_MEMBER = `${publicPath}/home/members`;
const PATH_SHOPPING = `${publicPath}/home/shopping/:cart_no`;
const PATH_CHECKOUT_ORDER = `${publicPath}/home/checkout-orders/:cart_no`;
const PATH_MASTER_UI = `${publicPath}/master-ui`;
const PATH_MS_COMPANY = `${publicPath}/home/ms_company`;
const PATH_MS_BRANCH = `${publicPath}/home/ms_branch`;
const PATH_MS_PRODUCT = `${publicPath}/home/ms_product`;
const PATH_MS_PRODUCT_GROUP = `${publicPath}/home/ms_group`;
const PATH_MS_STOCK = `${publicPath}/home/ms_stock`;
const PATH_MS_PROMOTION = `${publicPath}/home/ms_promotion`;
const PATH_MS_ROLE = `${publicPath}/home/ms_role`;
const PATH_DATABASE = `${publicPath}/home/database_config`;
const PATH_TEST_GOOGLE_MAP = `${publicPath}/googlemap`;
const PATH_ORDERS_TRACKING = `${publicPath}/home/tracking`;
const PATH_CHECK_CARTS = `${publicPath}/home/check_carts`;
const PATH_MEMBER_ORDERS_CONFIRM = `${publicPath}/order_confirm/:cart_no/:database`;
const PATH_USE_PROMOTION = `${publicPath}/home/use_promotion`;

const PATH_ACCESS_DENIED = `${publicPath}/access_denied`;
const PATH_CLIENT_REGISTER = `${publicPath}/client-register`;

const INIT_LOAD = 'app/App/INIT_LOAD';
const INIT_LOAD_SUCCESS = 'app/App/INIT_LOAD_SUCCESS';
const INIT_LOAD_ERROR = 'app/App/INIT_LOAD_ERROR';
const CLEAR_MENU = 'app/App/CLEAR_MENU';

module.exports = {
  publicPath,
  serviceApiPath,
  PATH_LOGIN,
  PATH_LOGOUT,
  PATH_REGISTER,
  PATH_FORGOT_PWD,
  PATH_RECOVER_PWD,
  PATH_HOME,
  PATH_DASHBOARD,
  PATH_LINE_LOGIN,
  PATH_PROFILE,
  PATH_PROFILE_EDIT,
  PATH_PROFILE_SHIPPING,
  PATH_PROFILE_CHANGE_PWD,
  PATH_MEMBER,
  PATH_SHOPPING,
  PATH_CHECKOUT_ORDER,
  PATH_MASTER_UI,
  PATH_MS_COMPANY,
  PATH_MS_BRANCH,
  PATH_MS_PRODUCT,
  PATH_MS_PRODUCT_GROUP,
  PATH_MS_STOCK,
  PATH_MS_PROMOTION,
  PATH_MS_ROLE,
  PATH_DATABASE,
  PATH_TEST_GOOGLE_MAP,
  PATH_ORDERS_TRACKING,
  PATH_CHECK_CARTS,
  PATH_MEMBER_ORDERS_CONFIRM,
  PATH_USE_PROMOTION,
  PATH_ACCESS_DENIED,
  PATH_CLIENT_REGISTER,
  INIT_LOAD,
  INIT_LOAD_SUCCESS,
  INIT_LOAD_ERROR,
  CLEAR_MENU,
};
