import React, {useState} from 'react';

import PropTypes from 'prop-types';


export default function TypingForm(props) {
    const [inputValue, setInputValue] = useState(props.inputValue);
    const [inputValid, setInputValid] = useState(true);
    const {word, onCompleted, onInputChanged} = props;

    const handleInputChange = (event) => {
        const newInputValue = event.target.value;
        if (word + " " === newInputValue) {
            onCompleted();
            return;
        }
        if (word.startsWith(newInputValue)) {
            setInputValue(newInputValue);
            setInputValid(true);
            onInputChanged(newInputValue);
        } else {
            setInputValid(false);
        }
    }

    return (
        <form className="form" onSubmit={(e) => e.preventDefault()}>
            <div className="inputField">
                <input autoFocus={true}
                    className={inputValid ? "inputField__input" : "inputField__input inputField__input_error"}
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(e)}
                />
                {!inputValid && <span className="inputField-message inputField__message_error">Wrong letter!!!Be careful next time</span>}
            </div>
        </form>
    );
}

TypingForm.propTypes = {
    inputValue: PropTypes.string,
    word: PropTypes.string.isRequired,
    onCompleted: PropTypes.func.isRequired,
    onInputChanged: PropTypes.func.isRequired,
};

TypingForm.defaultProps = {
    inputValue: ''
};
