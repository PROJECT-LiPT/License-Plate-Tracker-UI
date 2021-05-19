import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';
import './SearchBar.css';
import Camera from '../Camera/Camera';
import { createLicensePlate } from '../../actions/user_actions';
import random from '../../utils/RandomNumber';

const SearchBar = () => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const licensePlateList = useSelector ((state) => state.user_reducer.licensePlateList);
  const [isCapture, setIsCapture] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handleOnClear = () => {
    //todo
  };

  useEffect(() => {
      scrollToModal();
  },[]);

  const scrollToModal = () => {
    modalRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start", 
      inline: "nearest"
    });
  };

  return(
    <div className="detail_page">
        <div ref={modalRef} className="scroll_position_holder"></div>
        <h2 className="licensePlate_message neon shadow">
            Upload
        </h2>
        <div className="licensePlate_detail shadow">
            <div className="detail_media shadow">
                <h2>Media Preview</h2>
                <img className="image" alt="Loading..." src={licensePlateList[licensePlateList?.length-1].imgUrl}/>
            </div>
            <div className="detail_info shadow">
                <div className="members">
                    <h2>Camera</h2>
                    <Camera onClear={handleOnClear} isCapture={isCapture} setIsCapture={setIsCapture} isPlaying={isPlaying}></Camera>      
                    {
                      isPlaying ? <>
                        <input type="submit" className="shadow neon" value="Stop Camera" onClick={() => setIsPlaying(false)}></input>
                        <input type="submit" className="shadow neon" value="Take Picture" onClick={() => setIsCapture(true)}></input>
                      </> :
                      <>
                        <input type="submit" className="shadow neon" value="Activate Camera" onClick={() => setIsPlaying(true)}></input>
                      </>
                    }
                    <FileBase className="base64" type="file" multiple={false} 
                      onDone = {({base64}) => { 
                        dispatch(createLicensePlate({id: random(1,50000), imgUrl:base64}));          
                      }}> 
                    </FileBase>
                </div>
                <h2>Information</h2>
                <div>Plate Number:&nbsp; <span>{licensePlateList[licensePlateList?.length-1].title}</span></div>
                <div>Owner:&nbsp; <span>{licensePlateList[licensePlateList?.length-1].owner}</span></div>
                <div>Origin:&nbsp; <span>{licensePlateList[licensePlateList?.length-1].origin}</span></div>
            </div>
        </div>
  </div>
);
  
};
export default SearchBar;