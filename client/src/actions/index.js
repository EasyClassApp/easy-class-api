/* eslint-disable */
import axios from 'axios';
import * as actionTypes from './types';

const BASE_URL = `${SERVER_URL}/api`;

export function signIn(email, password) {
  return (dispatch) => {
    axios
      .post(`${BASE_URL}/signin`, { email, password })
      .then((response) => {
        dispatch({ type: actionTypes.SIGNED_IN, staff: response.data });
      })
      .catch(() => {});
  };
}

export function fetchStaffList() {
  return (dispatch) => {
    axios
      .get(`${BASE_URL}/user`)
      .then((response) => {
        dispatch({ type: actionTypes.STAFF_LIST_FETCHED, staff: response.data });
      })
      .catch(() => {});
  };
}
