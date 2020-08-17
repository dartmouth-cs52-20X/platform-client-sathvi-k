import { combineReducers } from 'redux';

import PostsReducer from './postsReducer';
import ErrorReducer from './error-reducer';
import AuthReducer from './auth-reducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  errors: ErrorReducer,
  auth: AuthReducer,
});

export default rootReducer;
