import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Camera.css';
import UseUserMedia from '../../utils/UseUserMedia';
import UseOffsets from '../../utils/UseOffsets';
import UseCardRatio from '../../utils/UseCardRatio';
import { createLicensePlate } from '../../actions/user_actions';
import random from '../../utils/RandomNumber';

const CAPTURE_OPTIONS = {
    audio:false,
    video: { facingMode: "Environment" }
};

const Camera = ({onClear, isCapture, setIsCapture, isPlaying}) => {
    const dispatch = useDispatch();
    const videoRef = useRef();
    const canvasRef = useRef();
    const licensePlateList = useSelector((state) => state.user_reducer.licensePlateList);
    const currentUser = useSelector((state) => state.user_reducer.loggedInUser);
    const [container, setContainer] = useState({height: 250, width: 250});
    const [aspectRatio, calculateRatio] = UseCardRatio(1.586);
    const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
    const [isFlashing, setIsFlashing] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const mediaStream = UseUserMedia(CAPTURE_OPTIONS);
    const offsets = UseOffsets(
        videoRef.current && videoRef.current.videoWidth,
        videoRef.current && videoRef.current.videoHeight,
        container.width,
        container.height
      );

    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = mediaStream;
    } 

    const handleCanPlay = () => {
        calculateRatio(videoRef.current.videoHeight, videoRef.current.videoWidth);
        setIsVideoPlaying(true);
        videoRef.current.play();
    }


    const handleCapture = () => {
        const context = canvasRef.current.getContext("2d");
        context.drawImage(
            videoRef.current, 
            offsets.x, 
            offsets.y, 
            container.width,
            container.height,
            0,
            0,
            container.width,
            container.height
        );
        const takenImageURL = canvasRef.current.toDataURL('image/jpeg', 1.0);
        dispatch(createLicensePlate({id: random(1,50000), uploader: currentUser.userName, imgUrl:takenImageURL}))
        .then(() => setIsCapture(false));
        setIsCanvasEmpty(false);
        setIsFlashing(true);
    }
    const handleClear = () => {
        const context = canvasRef.current.getContext("2d");
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setIsCanvasEmpty(true);
        onClear();
    }

    useEffect(() => {
        setIsVideoPlaying(isPlaying);
    },[isPlaying]);

    useEffect(() => {
        if (isCapture) {
            handleCapture();
        }
    },[isCapture, setIsCapture]);

    if (!mediaStream) return null;
    
    return (
        <div className="camera_container" style={{height: `${container.height}px`, width: `${container.width}px`}}>
            <canvas className="takenpic_canvas" 
                ref={canvasRef} 
                height={container.height} 
                width={container.width}
                />
            <video className="camera" 
                ref={videoRef} 
                onCanPlay={handleCanPlay}
                autoPlay 
                playsInline 
                muted
                hidden={!isVideoPlaying}
            />
        </div>
    )
};

export default Camera;