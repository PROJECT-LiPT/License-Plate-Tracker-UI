import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './LicensePlateDetail.css';
import FlashCard from '../FlashCard/FlashCard';
import ProgressChart from '../Chart/Chart';
import step2_1 from '../../assets/imgs/step2_1.png';
import step2_2 from '../../assets/imgs/step2_2.png';

const LicensePlateDetail = () => {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const modalRef = useRef();
    const licensePlateList = useSelector((state) => state.user_reducer.licensePlateList);
    const [licensePlate, setLicensePlate] = useState(null);
    const dataSource = [
      {
        front: {
          text: "Step 2_1",
          image: step2_1,
        },
        back: {
          text: "Processing Image",
        }
      },
      {
        front: {
          text: "Step 2_2",
          image: step2_2,
        },
        back: {
          text: "Decolor",
        }
      }

    ];

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
                <div className="tests">
                  <h2>Overall Performance</h2>
                </div>
              </div>
              <ProgressChart
                  type="bar"
                  label="Processing Time (s)"
                  labels={licensePlateList?.map((lp) => lp.title)}
                  data={licensePlateList?.map((lp) => lp.process)}
                  scales={{
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true
                          }
                        }
                      ]
                    }}
              />
              <div className="test_container">
                <div className="tests">
                <h2>Mechanism</h2>
                      <FlashCard
                          dataSource={dataSource}
                          voice={"en-EN"}
                          flipDirection="vertical" 
                          onChange={(step, side) => console.log(step, side)} 
                          onSound={(text) => console.log(text)} 
                          onFinish={() => console.log("Finish!")}
                          backgroundColor={""}
                          barColor={"rgba(255, 255, 255, 0.527)"}
                          cardColor={"rgba(255, 255, 255, 0.527)"}
                          textColor={"black"}
                          dropShadow={true}
                          height={450}
                          width={"100%"}
                    />;
                </div>
              </div>
            </div>
      </div>
    );
}
export default LicensePlateDetail;