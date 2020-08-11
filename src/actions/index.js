import axios from 'axios';

const ROOT_URL = 'https://sathvi-cs52-lab5.herokuapp.com/api';
// const ROOT_URL = 'https://platform.cs52.me/api';
// const API_KEY = '?key=skorandla';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  ERROR_SET: 'ERROR_SET',
  ERROR_CLEAR: 'ERROR_CLEAR',
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
  axios.post(`${ROOT_URL}/posts`, post)
    .then(() => {
      history.push('/');
    })
    .catch((error) => {
      // dispatch({ type: ActionTypes.ERROR_SET, error });
    });
}

export function updatePost(id, post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}/`, post)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
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
    axios.delete(`${ROOT_URL}/posts/${id}`)
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
