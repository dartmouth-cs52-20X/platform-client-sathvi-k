import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

// looked at count-reducer from sa6 for general outline
const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return ({ ...state, all: action.payload });
    case ActionTypes.FETCH_POST:
      return ({ ...state, current: action.payload });
    default:
      return state;
  }
};

export default PostsReducer;
