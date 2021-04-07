// Dette auth.js i redusers ble opprettet for å administrere noen autoriserte ting der, for eksempel
/**
 * Dette auth.js i redusers ble opprettet
 * for å administrere noen autoriserte ting der,
 * for eksempel token og bruker id
 */
import {AUTHENTICATE, LOGOUT, SET_DID_TRY_AL} from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      };

    default:
      return state;
  }
};
