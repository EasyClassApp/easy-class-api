import { STAFF_LIST_FETCHED } from '../actions/types';

const initialState = {
  staff: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STAFF_LIST_FETCHED: {
      return {
        ...state,
        staff: action.staff,
      };
    }

    default:
      return state;
  }
};
