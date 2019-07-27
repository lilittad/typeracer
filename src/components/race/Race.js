import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {getLetterStatus, getWordsFromText} from '../../utils/utils';
import TypingForm from './components/typing-form/TypingForm';
import Timer from './components/timer/Timer';

import './race.css';

function Race(props) {
    const [inputValue, setInputValue] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const words = getWordsFromText(props.text);

    const handleTypingComplete = () => {
        if (wordIndex + 1 < words.length ) {
            setWordIndex(wordIndex+1);
            setInputValue('');
        } else {
            props.onCompleted();
        }
    }

    const handleInputChange = (newInputValue) => {
        setInputValue(newInputValue);
    }

    const handleTick = () => {};

    return (
        <div className="race">
            <div className="race__text">
                {words.map((word,wIndex) =>
                    [...word].map((letter, lIndex) =>
                        <span
                            key={`l_${wIndex}_${lIndex}`}
                            style={{color: getLetterStatus(wordIndex, inputValue.length, wIndex, lIndex)}}>
                            {letter}{lIndex === word.length-1 ? " ": ""}
                            </span>)
                )}
            </div>
            <TypingForm
                inputValue=""
                key={wordIndex}
                word={words[wordIndex]}
                onInputChanged={handleInputChange}
                onCompleted={handleTypingComplete}
            />
            <Timer onTick={handleTick}/>
        </div>
    );
}

Race.propTypes = {
    text: PropTypes.string,
};

Race.defaultProps = { text: '' };

export default Race;
