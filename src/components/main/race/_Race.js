import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {getLetterStatus, getWordsFromText, getWordsPerMinute} from '../../../utils/utils';
import TypingForm from './components/typing-form/TypingForm';
import Timer from './components/timer/Timer';

import './race.css';

function _Race(props) {
    const [inputValue, setInputValue] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [score, setScore] = useState(0);
    const words = getWordsFromText(props.text);

    const handleTypingComplete = () => {
        if (wordIndex + 1 < words.length ) {
            setWordIndex(wordIndex+1);
            setInputValue('');
            console.log('typing');
            setScore(getWordsPerMinute(words.slice(0, wordIndex), inputValue, seconds));
        } else {
            props.onCompleted();
        }
    }

    const handleInputChange = (newInputValue) => {
        setInputValue(newInputValue);
        console.log('input change');
        setScore(getWordsPerMinute(words.slice(0, wordIndex), newInputValue, seconds));
    }

    const handleTick = (seconds) => {
        setSeconds(seconds);
        setInputValue((inputValue) => {
            setScore(getWordsPerMinute(words.slice(0, wordIndex), inputValue, seconds));
            return inputValue;

        });
    };

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
            <div>
                Your score is {score}
            </div>
        </div>
    );
}

_Race.propTypes = {
    text: PropTypes.string,
};

_Race.defaultProps = { text: '' };

export default _Race;
