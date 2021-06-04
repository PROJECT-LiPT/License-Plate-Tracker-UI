import axios from 'axios';
// local Python server
// const flaskUrl = 'http://127.0.0.1:5000/prediction/';

//server máy của Toàn
const flaskUrl = 'https://smartmekong.vn/prediction/';

// for heroku server
const userUrl = 'https://project-lipt.herokuapp.com/users';
const licensePlateUrl = 'https://project-lipt.herokuapp.com/licensePlates';

// for local server
// const userUrl = 'http://localhost:80/users';
// const licensePlateUrl = 'http://localhost:80/licensePlates';

// user routes
export const createUser = (newUser) => axios.post(userUrl, newUser);
export const getUser = (userName) => axios.get(`${userUrl}/${userName}`);
export const login = (userInfo) => axios.post(`${userUrl}/${userInfo}`, userInfo);
export const logout = (userInfo) => axios.post(`${userUrl}/logout/${userInfo}`, userInfo);
export const fetchUser = () => axios.get(userUrl);
export const deleteUser = (userName) => axios.delete(`${userUrl}/${userName}`);
export const updateUser = (userName, toUpdateUser) => axios.post(`${userUrl}/updateUser/${userName}`, toUpdateUser);
// licensePlate
export const fetchLicensePlate = () => axios.get(licensePlateUrl);
export const createLicensePlate = (newLicensePlate) => axios.post(licensePlateUrl, newLicensePlate);
export const uploadToFlaskServer = (newLicensePlate) => axios.post(flaskUrl, newLicensePlate);
export const deleteLicensePlate = (id) => axios.delete(`${licensePlateUrl}/${id}`);
export const updateLicensePlate = (id, toUpdateLicensePlate) => axios.post(`${licensePlateUrl}/updateLicensePlate/${id}`, toUpdateLicensePlate);

    
