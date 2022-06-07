/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 */
export const publicPath = process.env.REACT_APP_PUBLIC_PATH || '/web-daily-online';

export const PATH_LOGIN = `${publicPath}/login`;
export const PATH_LOGOUT = `${publicPath}/logout`;
export const PATH_REGISTER = `${publicPath}/register`;
export const PATH_FORGOT_PWD = `${publicPath}/forgot-password`;
export const PATH_RECOVER_PWD = `${publicPath}/recover-password`;

export const PATH_HOME = `${publicPath}/home/*`;
export const PATH_DASHBOARD = `${publicPath}/home/dashboard`;
export const PATH_LINE_LOGIN = `${publicPath}/home/line_login/:token`;
export const PATH_PROFILE = `${publicPath}/home/profile`;
export const PATH_PROFILE_EDIT = `${publicPath}/home/profile-edit`;
export const PATH_PROFILE_SHIPPING = `${publicPath}/home/profile-shipping`;
export const PATH_PROFILE_CHANGE_PWD = `${publicPath}/home/profile-change-pwd`;
export const PATH_MEMBER = `${publicPath}/home/members`;
export const PATH_SHOPPING = `${publicPath}/home/shopping/:cart_no`;
export const PATH_CHECKOUT_ORDER = `${publicPath}/checkout-orders/:cart_no`;
export const PATH_MASTER_UI = `${publicPath}/master-ui`;
export const PATH_MS_COMPANY = `${publicPath}/home/ms_company`;
export const PATH_MS_BRANCH = `${publicPath}/home/ms_branch`;
export const PATH_MS_PRODUCT = `${publicPath}/home/ms_product`;
export const PATH_MS_PRODUCT_GROUP = `${publicPath}/home/ms_group`;
export const PATH_MS_STOCK = `${publicPath}/home/ms_stock`;
export const PATH_MS_PROMOTION = `${publicPath}/home/ms_promotion`;
export const PATH_MS_ROLE = `${publicPath}/home/ms_role`;
export const PATH_DATABASE = `${publicPath}/home/database_config`;
export const PATH_TEST_GOOGLE_MAP = `${publicPath}/googlemap`;
export const PATH_ORDERS_TRACKING = `${publicPath}/home/tracking`;
export const PATH_CHECK_CARTS = `${publicPath}/home/check_carts`;
export const PATH_MEMBER_ORDERS_CONFIRM = `${publicPath}/order_confirm/:cart_no/:database`;
export const PATH_USE_PROMOTION = `${publicPath}/home/use_promotion`;

export const PATH_ACCESS_DENIED = `${publicPath}/access_denied`;
export const PATH_CLIENT_REGISTER = `${publicPath}/client-register`;

export const INIT_LOAD = 'app/App/INIT_LOAD';
export const INIT_LOAD_SUCCESS = 'app/App/INIT_LOAD_SUCCESS';
export const INIT_LOAD_ERROR = 'app/App/INIT_LOAD_ERROR';
export const CLEAR_MENU = 'app/App/CLEAR_MENU';
