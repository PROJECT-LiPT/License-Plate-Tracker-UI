import { React, useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Carousel} from 'react-responsive-carousel';

import Card from './Card/Card';
import LoadingContainer from '../../utils/LoadingContainer/LoadingContainer';
import 
{
    fetchLicensePlate, 
    fetchUser, 
    setNotification, 
    setIsLoading, 
    filterLicensePlateById,
    register  
} 
    from '../../actions/user_actions';
import random from '../../utils/RandomNumber';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './CardList.css';

const CardList = ({context}) => {
    const dispatch = useDispatch();
    const searchInput = useRef(null);
    const licensePlateList = useSelector((state) => state.user_reducer.licensePlateList);
    const userList = useSelector((state) => state.user_reducer.userList);
    const currentUser = useSelector((state) => state.user_reducer.loggedInUser);
    const [currentItem, setCurrentItem] = useState(0);


    const loadLicensePlate = () => {
        dispatch(setIsLoading(true));
        dispatch(fetchLicensePlate())
        .then(() => dispatch(setNotification("Sucessfully Updated")))
        .then(() => dispatch(setIsLoading(false)));
    }
    
    const loadUser = () => {
        dispatch(setIsLoading(true));
        dispatch(fetchUser())
        .then(() => dispatch(setNotification("Sucessfully Updated")))
        .then(() => dispatch(setIsLoading(false)));
    }

    const addUser = () => {
        dispatch(register(
            {
                userName: random(1,20000),
                passWord: '123456',
                gender: 'Male',
                fullName: 'Test', 
                birthDate: '',
                phoneNumber: '',
                address: '',
                email: ''
            }
        ));
    }

    const searchByID = (e) => {
        e.preventDefault();
        const id = searchInput.current.value;
        if (id.trim() === '') {
            dispatch(setNotification("Please enter id"));
        } else {
            dispatch(filterLicensePlateById(id));
        }
    }
    const toLastArray = (array) => {
        if (array) {
            setCurrentItem(array.length-1);
        }
    }

    useEffect (() => {
        switch (context) {
            case "list":
            case "edit_list":
            case "edit_lp":
                toLastArray(licensePlateList);
                break;
            default:
                setCurrentItem(0);
                break;
        }
    },[licensePlateList, userList]);

    useEffect (() => {
        setCurrentItem(0);
    },[]);

    const customCarousel  = (children) => (
        <Carousel 
            className="card_container"
            centerMode={true} 
            centerSlidePercentage={55} 
            swipeable
            showIndicators={true} 
            useKeyboardArrows
            stopOnHove={true}
            showThumbs={false}
            showStatus={false}
            selectedItem={currentItem}
            onChange= {(key,card) => setCurrentItem(key)}
        >
            {children}
        </Carousel>
    );

    switch (context) {
        case "list":
            return(
                <div className="card_page shadow">
                    <div className="card_header"> <b>Gallery</b> 
                        <form onSubmit={(e) => searchByID(e)}>
                            <input type="text" ref={searchInput} className="shadow" placeholder="Search by id"></input>
                            <input type="submit" className="shadow"></input>
                            <button type="button" className="card_menu_button refresh_button_user shadow" onClick={loadLicensePlate}></button>
                        </form>
                    </div>
                    {
                        customCarousel
                        (
                            licensePlateList != null && licensePlateList.length != 0? 
                            licensePlateList.map ((item,key) => 
                            (<Card key={key} licensePlate={item} type={"licensePlate"} mode={"view"}/>))
                            : (<LoadingContainer style={'spinner'}/>)
                        )
                    }
                </div>
            );
        case "edit_list":
            return(
                <div className="card_page shadow">
                    <div className="card_header"> <b>Your Upload</b> 
                        <form onSubmit={(e) => searchByID(e)}>
                            <input type="text" ref={searchInput} className="shadow" placeholder="Search by id"></input>
                            <input type="submit" className="shadow"></input>
                            <button type="button" className="card_menu_button refresh_button_user shadow" onClick={loadLicensePlate}></button>
                        </form>
                    </div>
                    {
                        customCarousel
                        (
                            licensePlateList != null && licensePlateList.length != 0 ?
                            licensePlateList.filter((lp) => lp.uploader === currentUser?.userName) 
                            .map ((item,key) => 
                            (<Card key={key} licensePlate={item} type={"licensePlate"} mode={"edit"}/>))
                            : (<LoadingContainer style={'spinner'}/>)
                        )
                    }
                </div>
            );
        case "edit_lp":
            return(
                <div className="card_page shadow">
                    <div className="card_header"> <b>Gallery Management</b> 
                        <form onSubmit={(e) => searchByID(e)}>
                            <input type="text" ref={searchInput} className="shadow" placeholder="Search by id"></input>
                            <input type="submit" className="shadow"></input>
                            <button type="button" className="card_menu_button refresh_button_user shadow" onClick={loadLicensePlate}></button>
                        </form>
                    </div>
                    {
                        customCarousel
                        (
                            licensePlateList != null && licensePlateList.length != 0 ?
                            licensePlateList.map ((item,key) => 
                            (<Card key={key} licensePlate={item} type={"licensePlate"} mode={"edit"}/>))
                            : (<LoadingContainer style={'spinner'}/>)
                        )
                    }
                </div>
            );
        case "edit_user":
            return(
                <div className="card_page shadow">
                    <div className="card_header"> <b>User Management</b> 
                        <button type="button" className="card_menu_button add_button shadow" onClick={addUser}></button>
                        <button type="button" className="card_menu_button refresh_button shadow" onClick={loadUser}></button>
                    </div>
                    {
                        customCarousel
                        (
                            userList != null && userList.length != 0 ?
                            userList.map ((item,key) => 
                            (<Card key={key} user={item} type={"user"} mode={"edit"}/>))
                            : (<LoadingContainer style={'spinner'}/>)
                        )
                    }
                </div>
            );    
        default:
            return (<LoadingContainer style={'dot'}/>);
    }
}
export default CardList;