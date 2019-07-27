import React from 'react';

import logo from './logo.png';
import './header.css';

function Header() {
    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="logo" />
        </header>
    );
}

export default Header;
