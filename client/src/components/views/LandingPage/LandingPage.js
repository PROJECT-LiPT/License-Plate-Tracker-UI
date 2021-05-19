import React from 'react';

import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import LicensePlateList from '../../LicensePlateList/LicensePlateList';
import Footer from '../../Footer/Footer';

const LandingPage = (props) => {
    return(
        <div>
            <main>
                <HeadingTitle title={props.title} subtitle={props.subTitle}/>
                <LicensePlateList/>
                <Footer/>
            </main>
        </div>
    );
}
export default LandingPage;