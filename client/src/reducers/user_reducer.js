import {
  LOGIN_USER,
  REGISTER_USER,
  GET_USER,
  FETCH_USER,
  DELETE_USER,
  UPDATE_USER,
  RESET_USER,
  LOGOUT_USER,
  FETCH_LP,
  DELETE_LP,
  CREATE_LP,
  UPDATE_LP,
  FILTER_LP_BY_ID,
  SET_NOTIFICATION,
  IS_LOADING
} from '../constants/actionTypes';

const loggedInUser = JSON.parse(localStorage.getItem('user'));

export default (state = { loggedInUser }, action) => {
  switch (action.type) {
    case REGISTER_USER:
        return { ...state, register: action.payload }
    case LOGIN_USER:
        return { ...state, loggedInUser: action.payload }
    case GET_USER:
        return { ...state, currentUser: action.payload }
    case FETCH_USER:
        return { ...state, userList: action.payload }                
    case DELETE_USER:
        return {...state, 
                userList: state.userList.filter((user) => user.userName != action.payload )
            }
    case UPDATE_USER:
        return { ...state, updatedUser: action.payload}            
    case RESET_USER:
        return { ...state, resetUser: action.payload}            
    case LOGOUT_USER:
        return { ...state, loggedInUser: action.payload}  
    case FETCH_LP:
        return { ...state, licensePlateList: action.payload }
    case DELETE_LP:
        return {...state, 
                licensePlateList: state.licensePlateList.filter((licensePlate) => licensePlate.id != action.payload )
            }
    case CREATE_LP:
        return {
            ...state, 
                licensePlateList:[...state.licensePlateList, action.payload]
            }
    case UPDATE_LP:
        return { ...state, updatedLicensePlate: action.payload}            
    case FILTER_LP_BY_ID:
        return { 
            ...state, 
                licensePlateList: state.licensePlateList.filter((licensePlate) => licensePlate.id === action.payload)
        }
    case SET_NOTIFICATION:
        return { ...state, notif: action.payload}
    case IS_LOADING:
        return { ...state, isLoading: action.payload}
    default:
        return state;
  }
};

