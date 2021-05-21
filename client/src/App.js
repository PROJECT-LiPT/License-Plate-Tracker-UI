import {React, useEffect, useState, Suspense, lazy} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import LoadingContainer from './utils/LoadingContainer/LoadingContainer';
import { fetchLicensePlate, fetchUser } from './actions/user_actions';
import * as auth from './utils/FakeAuth.js';
import './App.css';
import NavBar from './components/NavBar/NavBar';

const LandingPage = lazy(() => import ('./components/views/LandingPage/LandingPage'));
const UserPage = lazy(() => import ('./components/views/UserPage/UserPage'));
const AdminPage = lazy(() => import ('./components/views/AdminPage/AdminPage'));

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const storeState = useSelector ((state) => state.user_reducer);
    const loginInfo = useSelector((state) => state.user_reducer.loggedInUser);
    const [title, setTitle] = useState("License Plate Tracker");
    const [subTitle, setSubTitle] = useState("Highly interactive tracking system");
    
    console.log(storeState);

    useEffect(()=> {
        dispatch(fetchLicensePlate());
        dispatch(fetchUser());
        // const fetchInterval = setInterval(() => {
        //     dispatch(fetchLicensePlate());
        //     dispatch(fetchUser());
        // }, 3500);
        if (loginInfo) {
            if (auth.isUser(loginInfo)) history.push('/user');
            if (auth.isAdmin(loginInfo)) history.push('/admin');
        }
        // return () => clearInterval(fetchInterval);
    },[loginInfo]);
      
    return (
        <>
            <NavBar/>
            <Suspense fallback={(<LoadingContainer style="bar"/>)}>
                <Switch>
                    <Route exact path="/" >
                        <LandingPage title={title} subTitle={subTitle}/>
                    </Route>
                    <Route path="/user">
                        <UserPage/>
                    </Route>
                    <Route path="/admin">
                        <AdminPage/>
                    </Route>
                </Switch>
            </Suspense>
        </>
    );
}

export default App;