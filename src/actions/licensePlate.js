import { DELETE, UPLOAD } from '../constants/actionTypes';

import * as api from '../api/index.js';

//successfully get data from backend
// export const getLp = () => async (dispatch) => {
//   try {
//     const { data } = await api.fetchLp();
//     dispatch({ type: FETCH_ALL, payload: data });
//     console.log(data);
//   } catch (error) {
//     console.log(error.message);
//   }
// };
//successfully push data to backend
export const uploadLp = (currentImage) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD, payload: currentImage});
    // send data to backend
    const { data } = await api.uploadLp(currentImage);
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteLp = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE, payload: id});
    // send data to backend
  } catch (error) {
    console.log(error.message);
  }
};

