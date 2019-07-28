import React, {useState} from 'react';

import './app.css';

import Header from '../header/Header';
import Main from '../main/Main';
import Footer from '../footer/Footer';

function App() {
    const [userName, setUserName] = useState('');

    const displayUserName = (userName) => {
        setUserName(userName);
    }

    return (
        <div className="app">
            <Header userName={userName}/>
            <Main onLogin={(userName) => displayUserName(userName)}/>
            <Footer/>
        </div>
    );
}

export default App;
