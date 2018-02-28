import axios from 'axios';

const HANDLE_LOG_IN = 'HANDLE_LOG_IN';
const LOG_OUT = 'LOG_OUT';
const PENDING_BETS = 'PENDING_BETS';
const ACTIVE_BETS = 'ACTIVE_BETS';
const PAST_BETS = 'PAST_BETS';

const initial_state = {
  loggedIn: false,
  userInfo: {},
  pendingBets: [],
  activeBets: [],
  pastBets: []
};

export default function reducer(state = initial_state, action) {
  switch (action.type) {
    case HANDLE_LOG_IN:
      return Object.assign({}, state, {
        loggedIn: action.payload.logIn,
        userInfo: action.payload.data
      });
    case LOG_OUT:
      return Object.assign({}, state, { loggedIn: action.payload });
    case PENDING_BETS:
      return Object.assign({}, state, { pendingBets: action.payload });
    case ACTIVE_BETS:
      return Object.assign({}, state, { activeBets: action.payload });
    case PAST_BETS:
      return Object.assign({}, state, { pastBets: action.payload });
    default:
      return state;
  }
}

function logInInfo(payload) {
  return {
    type: HANDLE_LOG_IN,
    payload
  };
}

export function logIn() {
  return function(dispatch) {
    return axios
      .get('/user/session')
      .then(response => {
        if (response.data === 'not logged in') {
          return dispatch(logInInfo({ data: {}, logIn: false }));
        }
        dispatch(logInInfo({ data: response.data, logIn: true }));
      })
      .catch(error => dispatch(logInInfo({ data: {}, logIn: false })));
  };
}

function logOutAction(payload) {
  return {
    type: LOG_OUT,
    payload
  };
}

export function logOut() {
  return function(dispatch) {
    return axios.get('/auth/logout').then(response => {
      dispatch(logOutAction(false));
    });
  };
}

function pendingBets(payload) {
  return {
    type: PENDING_BETS,
    payload
  };
}

export function getPendingBets(id) {
  return function(dispatch) {
    return axios.post('/api/getPendingBets', { id }).then(response => {
      dispatch(pendingBets(response.data));
    });
  };
}

function activeBets(payload) {
  return {
    type: ACTIVE_BETS,
    payload
  };
}

export function getActiveBets(id) {
  return function(dispatch) {
    return axios.post('/api/getActiveBets', { id }).then(response => {
      dispatch(activeBets(response.data));
    });
  };
}

function pastBets(payload) {
  return {
    type: PAST_BETS,
    payload
  };
}

export function getPastBets(id) {
  return function(dispatch) {
    return axios.post('/api/getPastBets', { id }).then(response => {
      dispatch(pastBets(response.data));
    });
  };
}
