import produce from "immer"
import {
  CHECK_LOGIN,
  CHECK_LOGIN_ERROR,
  CHECK_LOGIN_SUCCESS,
  CHECK_LOGOUT,
  CHECK_LOGOUT_ERROR,
  CHECK_LOGOUT_SUCCESS,
} from "./constants"

export const initialState = {
  loginForm: {
    username: "",
    password: "",
  },
  loggedIn: false,
  error: "",
}

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHECK_LOGIN:
        draft.loginForm.username = action.payload.username
        draft.loginForm.password = action.payload.password
        draft.loggedIn = false
        break
      case CHECK_LOGIN_SUCCESS:
        draft.loggedIn = true
        break
      case CHECK_LOGIN_ERROR:
        draft.error = action.payload
        draft.loggedIn = false
        break
      case CHECK_LOGOUT:
        break
      case CHECK_LOGOUT_SUCCESS:
        draft.loginForm.username = ""
        draft.loginForm.password = ""
        draft.loggedIn = false
        break
      case CHECK_LOGOUT_ERROR:
        draft.error = action.error
        break
    }
  })

export default loginReducer
