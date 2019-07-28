import React, {useState} from 'react';

import PropTypes from 'prop-types';

import './login-form.css';

export default function LoginForm(props) {
    const [userName, setUserName] = useState('');

    const handleInputChange = (event) => {
        setUserName(event.target.value);
    }

    const handleClick = () => {
        props.onSubmit(userName);
    }

    return (
        <form className="form login-form" onSubmit={(e) => e.preventDefault()}>
            <div className="login-form__title"> Enter your userName</div>
            <div className="inputField">
                <input autoFocus={true}
                       className="inputField__input"
                       type="text"
                       name="username"
                       value={userName}
                       onChange={(e) => handleInputChange(e)}
                />
            </div>
            <button className="button" onClick={() => handleClick()}>Press me if you want to play</button>
        </form>
    );
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

