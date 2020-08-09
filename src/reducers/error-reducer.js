import { ActionTypes } from '../actions';

const initialState = {
  error: '',
};

// looked at count-reducer from sa6 for general outline
const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ERROR_SET:
      return ({ ...state, error: action.payload });
    case ActionTypes.ERROR_CLEAR:
      return ({ ...state, error: '' });
    default:
      return state;
  }
};

export default ErrorReducer;
