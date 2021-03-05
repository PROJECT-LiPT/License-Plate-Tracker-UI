import { UPLOAD } from '../constants/actionTypes';

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
export const uploadLp = (lp) => async (dispatch) => {
  try {
    const { data } = await api.uploadLp(lp);
    dispatch({ type: UPLOAD, payload: data });
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};
