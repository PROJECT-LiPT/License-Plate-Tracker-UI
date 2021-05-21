import {React, Suspense }from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import EditUserList from '../../EditUserList/EditUserList';
import EditList from '../../EditList/EditList';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';
import Selection from '../../Selection/Selection';
import './AdminPage.css';
import EditLicensePlateList from '../../EditLicensePlateList/EditLicensePlateList';
import LicensePlateDetail from '../../LicensePlateDetail/LicensePlateDetail';

const AdminPage = () => {

    const { path } = useRouteMatch();

    return(
        <Suspense fallback={(<LoadingContainer style="bar"/>)}>
            <main>
                <HeadingTitle title="Admin Dashboard"/>
                <Switch>
                    <Route exact path={`${path}`}>
                        <Selection user="admin"/>
                    </Route>
                    <Route exact path={`${path}/gallery`}>
                        <EditLicensePlateList/>
                    </Route>
                    <Route path={`${path}/gallery/:id`}>
                        <LicensePlateDetail/>
                    </Route>
                    <Route path={`${path}/user`}>
                        <EditUserList/>
                    </Route>
                </Switch>
            </main>
        </Suspense>
    );
}
export default AdminPage;