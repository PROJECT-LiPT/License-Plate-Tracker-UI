import React from 'react';
import { Link } from 'react-router-dom';
import './Selection.css';

const Selection = ({user}) => {
  return (
    <div className="selection_container shadow corner_box corner_box_e">
      <div>
      <Link to={user === "user" ? '/user/gallery' : null }>
        <button type="button" className="box shadow">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <line className="top" x1="0" y1="0" x2="900" y2="0"/>
            <line className="left" x1="0" y1="460" x2="0" y2="-920"/>
            <line className="bottom" x1="300" y1="460" x2="-600" y2="460"/>
            <line className="right" x1="300" y1="0" x2="300" y2="1380"/>
          </svg>
          <h3>{ user === "user" ? "Gallery" : null}</h3>
          <span>(0)</span>
          <span>{ user === "user" ? "License Plate List" : null}</span>
        </button>
      </Link>
      <Link to={user === "user" ? '/user/upload' : null }>
        <button type="button" className="box shadow">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <line className="top" x1="0" y1="0" x2="900" y2="0"/>
            <line className="left" x1="0" y1="460" x2="0" y2="-920"/>
            <line className="bottom" x1="300" y1="460" x2="-600" y2="460"/>
            <line className="right" x1="300" y1="0" x2="300" y2="1380"/>
          </svg>
          <h3>{ user === "user" ? "Upload" : null}</h3>
          <span>(0)</span>
          <span>{ user === "user" ? "License Plate Tracker" : null}</span>
        </button>
      </Link>
      </div>
      <div>
        <Link to={user === "user" ? '/user/algorithm' : null }>
          <button type="button" className="box shadow">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <line className="top" x1="0" y1="0" x2="900" y2="0"/>
              <line className="left" x1="0" y1="460" x2="0" y2="-920"/>
              <line className="bottom" x1="300" y1="460" x2="-600" y2="460"/>
              <line className="right" x1="300" y1="0" x2="300" y2="1380"/>
            </svg>
            <h3>{ user === "user" ? "Algorithm" : null}</h3>
            <span>(0)</span>
            <span>{ user === "user" ? "Workflow Explanation" : null}</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
export default Selection;
