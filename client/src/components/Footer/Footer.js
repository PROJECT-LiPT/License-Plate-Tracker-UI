import React from 'react';

import './Footer.css';

const Footer = () => {
    const date = new Date();
    return(
        <footer className="shadow">
            <h2>&copy; { date.getFullYear() }, License Plate Tracker. Developed by Project LiPT Team from CTU </h2>
        </footer>
    );
}
export default Footer;