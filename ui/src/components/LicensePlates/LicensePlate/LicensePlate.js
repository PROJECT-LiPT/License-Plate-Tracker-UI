import React from 'react';

import './LicensePlate.css';

const LicensePlate = ({id, currentBase64}) => {
  const onCloseForm = () => {
    //delete action
  }
  if (id === 0) {
    return null;
  } else {
      return (
        <div id="menu" className="lp_container_menu">
          <div className="title_bar">
            {id}
          {/* delete button */}
          </div>
          <div className="user_info">
            <div> Owner: { currentBase64 ? <span> Mr. A </span> : <span> Loading...</span> } </div>
            <div> Age: { currentBase64 ? <span> 28 </span> : <span> ...</span> } </div>
            <div> Gender: { currentBase64 ? <span> Male </span> : <span> Loading...</span> }</div>
            <div> Register location: { currentBase64 ? <span> Mars </span> : <span> Loading...</span> } </div>
          </div>
          <div className="lp_image_container">
            { currentBase64 ? <img className="lp_image" alt="Loading..." src={`${currentBase64}`}/> : <span> Loading...</span> }
          </div>
        </div>
      );
  }
};
export default LicensePlate;