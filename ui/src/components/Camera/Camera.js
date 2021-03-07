import React, { useRef, useState } from 'react';
import './Camera.css';
import UseUserMedia from '../../utils/UseUserMedia';
import UseOffsets from '../../utils/UseOffsets';
import UseCardRatio from '../../utils/UseCardRatio';
import Button from '../Button/Button';

const CAPTURE_OPTIONS = {
    audio:false,
    video: { facingMode: "Environment" }
};

const Camera = ({onClear, setCurrentTakenPic, currentImage}) => {
    const videoRef = useRef();
    const canvasRef = useRef();
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
        setCurrentTakenPic({id: currentImage.length, base64:takenImageURL});
        setIsCanvasEmpty(false);
        setIsFlashing(true);
    }
    const handleClear = () => {
        const context = canvasRef.current.getContext("2d");
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setIsCanvasEmpty(true);
        onClear();
    }

    if (!mediaStream) return null;
    
    return (
        <div className="camera_container" style={{height: `${container.height}px`, width: `${container.width}px`}}>
            <video className="camera" 
                ref={videoRef} 
                onCanPlay={handleCanPlay} 
                autoPlay 
                playsInline 
                muted
                hidden={!isVideoPlaying}
            />
            {isVideoPlaying && (
                 <Button className="snapshot_button" onClick={handleCapture} displayText="&#9737;"/>
            )}
            <canvas className="takenpic_canvas" 
                ref={canvasRef} 
                height={container.height} 
                width={container.width}
            />
        </div>
    )
};

export default Camera;