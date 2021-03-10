import React, { useEffect, useRef } from 'react';
import { useSelector  } from 'react-redux';

import './LicensePlates.css';
import LicensePlate from './LicensePlate/LicensePlate';
import Button from '../Button/Button';

const LicensePlates = ({currentBase64}) => {
  const lp = useSelector((licensePlate) => licensePlate.licensePlate);
  const bottomRef = useRef();
  const topRef = useRef();
  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start", 
      inline: "nearest"
    });
  };
  const scrollToTop = () => {
    topRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start", 
      inline: "nearest"
    });
  }
  useEffect(() => {
    if (lp.length >=4) {
      scrollToBottom();
    };
    console.log(lp);
  }, [currentBase64]);
  return (
    <div className="forms_container">
      <div ref={topRef} className="top_list"></div>
      {
        !lp.length ? (<div> Loading... </div>)
        : lp.map((item, key) => (<LicensePlate key={key} id={item.id} currentBase64={item.base64}></LicensePlate>))
      }
      <div ref={bottomRef} className="bottom_list">
      <Button displayText="&#8657;" onClick={scrollToTop}></Button>
      </div>
    </div>
  );
};
export default LicensePlates;