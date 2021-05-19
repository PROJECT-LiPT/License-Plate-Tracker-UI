import {React, useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

import './HeadingTitle.css';

const HeadingTitle = ({title, subtitle}) => {
    const {url} = useRouteMatch();
    const currentUserInfo = useSelector ((state) => state.user_reducer.loggedInUser);
    const [userMode, setUserMode] = useState('');

    useEffect(() => {
        if (currentUserInfo) {
            if(currentUserInfo.isUser) {
                setUserMode('user');
            } 
        }
        return () => {
            setUserMode('');
        }
    },[currentUserInfo]);

    const renderUserMenu = (
                    <>
                        <nav>
                            <Link className="shadow" to={`${url}`}>Home</Link>  
                            <Link className="shadow" to={`${url}/gallery`}>Gallery</Link>
                            <Link className="shadow" to={`${url}/upload`}>Upload</Link>
                            <Link className="shadow" to={`${url}/algorithm`}>Algorithm</Link>
                        </nav>
                    </>
                    );
    
    const renderMenu = () => {
        switch (userMode) {
            case "user":
                return renderUserMenu;
            default:
                return (
                    <>
                        <h2> {title} </h2>
                        <p> {subtitle} </p>
                    </>
                );
        }
    }
    
    return(
        <div className="heading_container shadow corner_box corner_box_e">
            {renderMenu()}
        </div>
    );
}
export default HeadingTitle;