import { combineReducers } from 'redux';

import PostsReducer from './postsReducer';
import ErrorReducer from './error-reducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  errors: ErrorReducer,
});

export default rootReducer;
