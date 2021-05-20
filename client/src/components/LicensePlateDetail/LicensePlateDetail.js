import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './LicensePlateDetail.css';
import FlashCard from '../FlashCard/FlashCard';
import ProgressChart from '../Chart/Chart';

const LicensePlateDetail = () => {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const modalRef = useRef();
    const licensePlateList = useSelector((state) => state.user_reducer.licensePlateList);
    const [licensePlate, setLicensePlate] = useState(null);
    

    useEffect(() => {
        if (licensePlateList === undefined || licensePlateList === null) {
            history.push('/licensePlate');
        } else {
            setLicensePlate(licensePlateList.find((licensePlate) => licensePlate.id === id));
        }
        
    },[licensePlateList]);

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
                {licensePlate?.title}            
            </h2>
            <div className="licensePlate_detail shadow">
                <div className="detail_media shadow">
                    <h2>Media Preview</h2>
                    <img className="image" alt="Loading..." src={licensePlate?.imgUrl}/>
                </div>
                <div className="detail_info shadow">
                    <h2>Information</h2>
                    <div>Uploader:&nbsp; <span>{licensePlate?.uploader}</span></div>
                    <div>Plate Number:&nbsp; <span>{licensePlate?.title}</span></div>
                    <div>Origin:&nbsp; <span>{licensePlate?.origin}</span></div>
                    <div>Processing Time:&nbsp; <span>{Math.round(licensePlate?.process * 100) / 100} second</span></div>
                </div>
            </div>
            <h2 className="licensePlate_message shadow">
                Model Processing
            </h2>
            <div className="content_container shadow">
              <div className="test_container">
                <h2 className="shadow">Statistic</h2>
                <div className="tests">
                  <div className="test">
                    <ProgressChart
                      type="pie"
                      label="Overall %"
                      labels={['Current Process (s)',' Average Process (s)']}
                      data={[5,10]}
                      scales={{}}
                      />
                  </div>
                 </div>
              </div>
              <div className="test_container">
                <h2 className="shadow">Mechanism</h2>
                <div className="tests">
                  <div className="test">Step 1: 
                    <img alt="Loading..." src={licensePlate?.step1}></img>
                  </div>
                  <div className="test">Step 2: 
                    <img alt="Loading..." src={licensePlate?.step2}></img>
                  </div>
                </div>
              </div>
            </div>
      </div>
    );
}
export default LicensePlateDetail;