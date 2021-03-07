import React from 'react';
import { useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import Draggable from 'react-draggable';
import './SearchBar.css';
import Camera from '../Camera/Camera';

const SearchBar = ({setCurrentBase64}) => {
  const currentImage = useSelector ((licensePlate) => licensePlate.licensePlate);
  const handleOnClear = () => {
    //todo
  };
  return (
    <Draggable bounds="html">
    <div autoComplete="off" noValidate className="search_bar_container">
      <label> ID </label>
      <div className="base64_container">
        <FileBase className="base64"  type="file" multiple={false} 
          onDone = {({base64}) => { 
            setCurrentBase64({id: currentImage.length, base64:base64});          
            }}> 
        </FileBase>
      </div> 
      <Camera onClear={handleOnClear} currentImage={currentImage} setCurrentTakenPic={setCurrentBase64}></Camera>      
    </div>
    </Draggable>
  );
};
export default SearchBar;