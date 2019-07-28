import React from 'react';
import PropTypes from 'prop-types';

import logo from './logo.png';
import './header.css';

export default function Header(props) {
    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="logo" />
            {props.userName && <h1 className="header__username">Welcome, {props.userName} jan :)</h1>}
        </header>
    );
}

Header.propTypes = {
    userName: PropTypes.string,
};

Header.defaultProps = { userName: '' };