import React from 'react';

import './app.css';

import Header from '../header/Header';
import Main from '../main/Main';
import Footer from '../footer/Footer';

function App() {
    return (
        <div className="app">
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
}

export default App;
