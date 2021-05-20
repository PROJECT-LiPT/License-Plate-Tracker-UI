import {React, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import LicensePlateList from '../../LicensePlateList/LicensePlateList';
import SearchBar from '../../SearchBar/SearchBar';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';
import LicensePlateDetail from '../../LicensePlateDetail/LicensePlateDetail';
import Selection from '../../Selection/Selection';

const UserPage = ({user}) => {
    const { path } = useRouteMatch();
    return(
        <Suspense fallback={(<LoadingContainer style="bar"/>)}>
            <main>
                <HeadingTitle title="User Dashboard"/>
                <Switch>
                    <Route exact path={`${path}`}>
                        <Selection user="user"/>
                    </Route>
                    <Route exact path={`${path}/upload`}>
                        <SearchBar/>
                    </Route>
                    <Route exact path={`${path}/gallery`}>
                        <LicensePlateList/>
                    </Route>
                    <Route path={`${path}/gallery/:id`}>
                        <LicensePlateDetail/>    
                    </Route>
                    <Route exact path={`${path}/algorithm`}>
                        <LoadingContainer/>
                    </Route>
                </Switch>
            </main>
        </Suspense>
    );
}
export default UserPage;