import React, {useEffect} from 'react';
import { useSelector  } from 'react-redux';

import './LicensePlates.css';
import LicensePlate from './LicensePlate/LicensePlate';

const LicensePlates = ({currentBase64}) => {
  const lp = useSelector((licensePlate) => licensePlate.licensePlate);
  useEffect(() => {
    console.log(lp);
  }, [currentBase64]);
  return (
    <div className="forms_container">
      {
        !lp.length ? (<div> Loading... </div>)
        : lp.map((item, key) => (<LicensePlate key={key} id={item.id} currentBase64={item.base64}></LicensePlate>)
       )
      }
    </div>
  );
};
export default LicensePlates;