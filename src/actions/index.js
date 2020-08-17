import axios from 'axios';

const ROOT_URL = 'https://sathvi-lab5-platform.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'https://platform.cs52.me/api';
// const API_KEY = '?key=skorandla';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  ERROR_SET: 'ERROR_SET',
  ERROR_CLEAR: 'ERROR_CLEAR',
  // SEARCH_FILTER: 'SEARCH',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      })
      .catch((error) => {
        // dispatch relay error
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function createPost(post, history) {
  axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } })
    .then(() => {
      history.push('/');
    })
    .catch((error) => {
      // dispatch({ type: ActionTypes.ERROR_SET, error });
    });
}

export function updatePost(id, post, history) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}/`, post, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
        history.push('/');
      });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}/`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        // relay error
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then(() => { history.push('/'); })
      .catch((error) => {
      // relay error
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function clearErrors() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_CLEAR, payload: '' });
  };
}
/* export function search(request) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/search/${request}`)
      .then((response) => {
        dispatch({ type: ActionTypes.SEARCH, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
} */

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser(user, history) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signin endpoint
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign In Failed: ${error.response.data}`));
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, user)
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER, payload: user });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch((error) => {
        dispatch(authError(`Sign In Failed: ${error.response.data}`));
      });
  };
}

export function signupUser(user, history) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, user)
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER, payload: user });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
        dispatch(authError(`Sign Up Failed: ${error.response.data}`));
      });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}
