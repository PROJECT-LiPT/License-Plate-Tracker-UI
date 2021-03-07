import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';
import { uploadLp } from './actions/licensePlate';
import LicensePlates from './components/LicensePlates/LicensePlates';
import SearchBar from './components/SearchBar/SearchBar';

const App = () => {
  const [currentImage, setCurrentImage] = useState({ id: 0, base64:''});
  const dispatch = useDispatch();
  // const testData = {
  //     a1: 2.1,
  //     a2: 2,
  //     a3: 12,
  //     a4: 5
  // };
  useEffect(() => {
    //only jpg/jpge work uptonow
    dispatch(uploadLp(currentImage));
    // test data
    // dispatch(uploadLp(testData));
  }, [currentImage, dispatch]);
  
  return (
    <div className="container">
      <div className="title">
        <span>License Plate</span>
        <br />
        <span>&#9886; Tracker &#9887;</span>
        <br />
      </div>
      <LicensePlates currentBase64={currentImage}> </LicensePlates> 
      <SearchBar setCurrentBase64={setCurrentImage}> </SearchBar>
    </div>
  );
};
export default App;
