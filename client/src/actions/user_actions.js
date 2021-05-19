import {
  FETCH_USER,
  LOGIN_USER,
  GET_USER,
  REGISTER_USER,
  LOGOUT_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_LP,
  DELETE_LP,
  FILTER_LP_BY_ID,
  CREATE_LP,
  UPDATE_LP,
  SET_NOTIFICATION,
  IS_LOADING,
} from '../constants/actionTypes';

import * as api from '../api/index.js';

export const login = (userInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.login(userInfo);
    localStorage.setItem('user', JSON.stringify(data));
    await dispatch({ type: LOGIN_USER, payload: data});
    await dispatch(fetchUser());
    await dispatch(setIsLoading(false));
    await dispatch(setNotification("Login successfully"));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Login failed!"));
  }
};

export const getUser = (userName) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.getUser(userName);
    await dispatch(setIsLoading(false));
    dispatch({ type: GET_USER, payload: data});
  } catch (error) {
    dispatch(setIsLoading(false));
    console.log(error.message);
  }
};

export const fetchUser = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUser();
    dispatch({ type: FETCH_USER, payload: data});
  } catch (error) {
    dispatch(setIsLoading(false));
    console.log(error.message);
  }
};

export const deleteUser = (userName) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.deleteUser(userName);
    await dispatch({ type: DELETE_USER, payload: data});
    await dispatch(fetchUser());
    await dispatch(setNotification("Deleted"));
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Delete failed!"));
  }
};

export const updateUser = (userName, userInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.updateUser(userName, userInfo);
    await dispatch({ type: UPDATE_USER, payload: data});
    await dispatch(setNotification("Update sucessfuly"));
    await dispatch(fetchUser());
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Update failed!"));
  }
};

export const logout = (userInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    localStorage.clear();
    const { data } = await api.logout(userInfo);
    await dispatch({ type: LOGOUT_USER, payload: data});
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsLoading(false));
    console.log(error.message);
  }
};

export const register = (userInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.createUser(userInfo);
    await dispatch({ type: REGISTER_USER, payload: data});
    await dispatch(setNotification("Register sucessfully"));
    await dispatch(fetchUser());
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Register failed!"));
  }
};

// licensePlate
export const filterLicensePlateById = (id) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    await dispatch(fetchLicensePlate());
    await dispatch({ type: FILTER_LP_BY_ID, payload: id});
    await dispatch(setIsLoading(false));
    await dispatch(setNotification(`LicensePlate ${id} selected `));
  } catch (error) {
    dispatch(setIsLoading(false));
    console.log(error.message);
  }
};

export const fetchLicensePlate = () => async (dispatch) => {
  try {
    const { data } = await api.fetchLicensePlate();
    dispatch({ type: FETCH_LP, payload: data});
  } catch (error) {
    dispatch(setIsLoading(false));
    console.log(error.message);
  }
};

export const deleteLicensePlate = (id) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.deleteLicensePlate(id);
    await dispatch({ type: DELETE_LP, payload: data});
    await dispatch(fetchLicensePlate());
    await dispatch(setIsLoading(false));
    await dispatch(setNotification(`Deleted licensePlate #${id}`));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Delete failed!"));
  }
};

export const updateLicensePlate = (id, licensePlateInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.updateLicensePlate(id, licensePlateInfo);
    await dispatch({ type: UPDATE_LP, payload: data});
    await dispatch(fetchLicensePlate());
    await dispatch(setIsLoading(false));
    await dispatch(setNotification(`Updated licensePlate ${id}`));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Update failed!"));
  }
};

export const createLicensePlate = (licensePlateInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.createLicensePlate(licensePlateInfo);
    await dispatch({ type: CREATE_LP, payload: data});
    await dispatch(setNotification(`Added licensePlate ${licensePlateInfo.id}`));
    await dispatch(fetchLicensePlate());
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Added failed!"));
  }
};

export const setNotification = (notification) => async (dispatch) => {
  try {
    dispatch({ type: SET_NOTIFICATION, payload: notification});
  } catch (error) {
    console.log(error.message);
  }
};

export const setIsLoading = (isLoading) => async (dispatch) => {
  try {
    dispatch({ type: IS_LOADING, payload: isLoading});
  } catch (error) {
    console.log(error.message);
  }
};

