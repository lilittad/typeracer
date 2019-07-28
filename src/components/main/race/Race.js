import React from 'react';
import PropTypes from 'prop-types';

import {getLetterStatus, getWordsFromText, getWordsPerMinute, getCompletionPercent} from '../../../utils/helper';
import TypingForm from './components/typing-form/TypingForm';
import Timer from './components/timer/Timer';
import Score from '../score/Score';

import './race.css';

export default class Race extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            wordIndex: 0,
            inputValue: '',
            score: 0
        }
    }
    handleTypingComplete() {
        const {text} = this.props;
        const words = getWordsFromText(text);
        const {wordIndex, score}= this.state;
        if (wordIndex + 1 < words.length ) {
            this.setState((state) => {
                return {
                    ...state,
                    wordIndex: wordIndex +1,
                    inputValue: '',
                    score: getWordsPerMinute(words.slice(0, wordIndex + 1), '', state.seconds)
                }
            });
        } else {
            this.props.onCompleted(score, getCompletionPercent(text, words.slice(0, wordIndex + 1), ''));
        }
    }

    handleInputChange(inputValue) {
        const words = getWordsFromText(this.props.text);
        this.setState((state) => {
            const score = getWordsPerMinute(words.slice(0, state.wordIndex),inputValue, state.seconds);
            return {
                ...state,
                inputValue,
                score

            }
        });
    }

    handleTick(seconds, done) {
        const {text} = this.props;
        const words = getWordsFromText(text);
        this.setState((state) => {
            const {inputValue} = state;
            const enteredWords = words.slice(0, state.wordIndex);
            const score = getWordsPerMinute(enteredWords, inputValue, seconds);
            if (done) {
                this.props.onCompleted(score, getCompletionPercent(text, enteredWords, inputValue));
            }
            return {
                ...state,
                seconds,
                score
            }
        });
    };

    render() {
        const words = getWordsFromText(this.props.text);
        const {wordIndex, inputValue, score} = this.state;
        return (
            <div className="race">
                <div className="race__text">
                    {words.map((word,wIndex) =>
                        [...word].map((letter, lIndex) =>
                            <span
                                key={`l_${wIndex}_${lIndex}`}
                                style={{color: getLetterStatus(wordIndex, inputValue.length , wIndex, lIndex)}}>
                            {letter}{lIndex === word.length-1 ? " ": ""}
                            </span>)
                    )}
                </div>
                <TypingForm
                    inputValue=""
                    key={wordIndex}
                    word={words[wordIndex]}
                    onInputChanged={(newInputValue) => this.handleInputChange(newInputValue)}
                    onCompleted={() => this.handleTypingComplete()}
                />
                <Timer onTick={(seconds, done) => this.handleTick(seconds, done)}/>
                <Score score={score}/>
            </div>
        )
    }
}

Race.propTypes = {
    text: PropTypes.string.isRequired,
    onCompleted: PropTypes.func.isRequired
};



