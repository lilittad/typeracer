import React, {useState} from 'react';

import Header from '../header/Header';
import Main from '../main/Main';

function App() {
    const [userName, setUserName] = useState('');

    const displayUserName = (userName) => {
        setUserName(userName);
    }

    return (
        <div className="app">
            <Header userName={userName}/>
            <Main onLogin={(userName) => displayUserName(userName)}/>
        </div>
    );
}

export default App;
