import { put, select, takeLatest } from "redux-saga/effects"
import { ADD_REGISTER_MEMBER } from "./constants"
import { addRegisterMemberSuccess, addRegisterMemberError } from "./actions"

import { makeSelectMember } from "./selectors"
import firebase from '../../config/firebase'

const moment = require('moment')

export function* onAddRegisterMember() {
  try {
    const member = yield select(makeSelectMember())
    const { prefix, fullName, mobile, username, password } = member
    const ref = firebase.app().database().ref('/member')
    const memberData = {
      code: "00000",
      prefix,
      fullName,
      mobile,
      username,
      password,
      created: moment().format('DD/MM/YYYY HH:mm:ss'),
      updated: moment().format('DD/MM/YYYY HH:mm:ss'),
      pointBalance:0,
      pointRedemption: 0,
      rewardRedemption: 0,
      pointExpired: '',
      dateOfBirth: '',
    }
    ref.push(memberData)
    yield put(addRegisterMemberSuccess())
  } catch (err) {
    yield put(addRegisterMemberError(err))
  }
}

export default function* registerSaga() {
  yield takeLatest(ADD_REGISTER_MEMBER, onAddRegisterMember)
}
