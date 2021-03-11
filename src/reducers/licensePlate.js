import { UPLOAD, DELETE } from '../constants/actionTypes';

// const intialState = {
//   lp:[]
// };
export default (licensePlate = [], action) => {
  switch (action.type) {
    case UPLOAD:
      return [...licensePlate, action.payload];
    case DELETE:
      return licensePlate.filter((licensePlate) => (licensePlate._id !== action.payload));  
    default:
      return licensePlate;
  }
};

