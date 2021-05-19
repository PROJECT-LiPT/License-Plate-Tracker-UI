import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './LicensePlateDetail.css';
import { fetchLicensePlate, joinLicensePlate, setNotification } from '../../actions/user_actions';
import FlashCard from '../FlashCard/FlashCard';

const LicensePlateDetail = () => {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const modalRef = useRef();
    const licensePlateList = useSelector((state) => state.user_reducer.licensePlateList);
    const courseList = useSelector((state) => state.user_reducer.courseList);
    const currentUser = useSelector((state) => state.user_reducer.loggedInUser);
    const userList = useSelector((state) => state.user_reducer.userList);
    const [licensePlate, setLicensePlate] = useState(null);
    const [course, setCourse] = useState(null);
    

    useEffect(() => {
        if (licensePlateList === undefined || licensePlateList === null) {
            history.push('/licensePlate');
        } else {
            setLicensePlate(licensePlateList.find((licensePlate) => licensePlate.id === id));
        }
        
    },[licensePlateList]);

    useEffect(() => {
      if (courseList === undefined || courseList === null) {
          history.push('/licensePlate');
      } else {
          setCourse(courseList.find((course) => course.id === licensePlate?.course));
      }
    },[courseList, licensePlate]);
    
    
    
    useEffect(() => {
      const interval = setInterval(() => {
        dispatch(fetchLicensePlate());
      }, 5000);
        scrollToModal();
        return () => {
          clearInterval(interval);
        }
    },[]);

    const onSubmitSchedule = (e) => {
        e.preventDefault();
        
    }
    const scrollToModal = () => {
        modalRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start", 
          inline: "nearest"
        });
      };
    
    const renderParticipants = () => {
        const participants = licensePlate?.licensePlateParticipants
                            .map((user, key) => 
                            (<a 
                                className="participant shadow" key={key} 
                                onClick={() => history.push(`/user/${user}`)}>
                                {user}
                            </a>));
        return participants;
    }
    
    const onJoin = () => {
        const isJoin = licensePlate?.licensePlateParticipants.some((user) => user === currentUser.userName);
        console.log(isJoin);
        //todo: check purchase first
        if (isJoin) {
          dispatch(setNotification(`Connected to licensePlate ${id}`));
          history.push(`/licensePlate/session/${licensePlate?.id}`);
        } else if (licensePlate?.licensePlateParticipants.length>=6) {
          dispatch(setNotification("LicensePlate full!"));
        } else {
          dispatch(joinLicensePlate(id, currentUser));
        }
    }

    const renderTests = () => {
      const tests = course?.testList
                      .map((test, key) => 
                      (<div className="test shadow" key={key}> 
                          <div className="test_title">
                              <a style={{width: "100%"}}>
                              {key+1}. {test.name}
                              </a>
                              <span> Duration: {test.duration} minutes </span>
                          </div>
                      </div>));
      return tests;
    } 

    const renderLessons = () => {
      const lessons = course?.lessonList
                      .map((lesson, key) => 
                        (<div className="test shadow" key={key}> 
                            <div className="test_title">
                                <a style={{width: "100%"}}>
                                {key+1}. {lesson.name}
                                </a>
                                <span>Estimated Reading: {lesson.duration} minutes </span>
                            </div>
                        </div>));
      return lessons;
    }

    return(
        <div className="detail_page">
            <div ref={modalRef} className="scroll_position_holder"></div>
            <h2 className="licensePlate_message neon shadow">
                {"LicensePlate " + licensePlate?.id}            
            </h2>
            <div className="licensePlate_detail shadow">
                <div className="detail_media shadow">
                    <h2>Media Preview</h2>
                    <img className="image" alt="Loading..." src={licensePlate?.imgUrl}/>
                </div>
                <div className="detail_info shadow">
                    <h2>Information</h2>
                    <div>Participants:&nbsp; <span>{licensePlate?.licensePlateParticipants.length ? licensePlate.licensePlateParticipants.length : "0"}</span></div>
                    <div>Ownership:&nbsp; <span>{licensePlate?.licensePlateParticipants.find((e) => e?.userName === currentUser?.userName) ? "Yes" : "No"}</span></div>
                    <div>Status:&nbsp; <span style={{color: "blue"}}>{licensePlate?.isFull ? "Full" : "Available"}</span></div>
                    <div> Course: &nbsp; 
                        <span>{course?.name}</span>
                    </div>
                    <div> Coacher: &nbsp; 
                        <span>{licensePlate?.licensePlateCoacher}</span>
                    </div>
                    <div> Price: &nbsp;
                        <span>{ licensePlate?.price + " VND"}</span>
                    </div>
                    <div> Start:&nbsp;
                        <span>{ licensePlate?.start ? licensePlate.start : "Not set"}</span>
                    </div>
                    <div> End:&nbsp;
                        <span>{ licensePlate?.end ? licensePlate.end : "Not set"}</span>
                    </div>
                    
                    <form className="members" onSubmit={(e) => onSubmitSchedule(e)}>
                        <h2>Members</h2>
                        <div className="participants">
                            {renderParticipants()}
                        </div>
                        <input type="submit" className="shadow neon" value="Join" onClick={onJoin}></input>
                        <input type="submit" className="shadow neon" value="Invite"></input>
                    </form>
                </div>
            </div>
            <h2 className="licensePlate_message shadow">
                Course Content
            </h2>
            <div className="content_container shadow">
              <div className="test_container">
                <h2 className="shadow">Lesson List</h2>
                <div className="tests">
                  {renderLessons()}
                </div>
              </div>
              <div className="test_container">
                <h2 className="shadow">Test List</h2>
                <div className="tests">
                  {renderTests()}
                </div>
              </div>
            </div>
      </div>
    );
}
export default LicensePlateDetail;