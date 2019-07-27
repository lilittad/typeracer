import {AVERAGE_WORD_LENGTH} from '../configs/constants';

const LETTER_STATUS = {
    PENDING: "black",
    CORRECT: "limegreen",
}

export const getWordsFromText = (text) => {
    return text.trim()
        .replace(/\s+/g, ' ')
        .split(' ')
}

export const getLetterStatus = (currentWordIndex, currentLetterIndex, wIndex, lIndex) => {
    if (wIndex < currentWordIndex || (wIndex === currentWordIndex && lIndex < currentLetterIndex)) {
        return LETTER_STATUS.CORRECT;
    }
    return LETTER_STATUS.PENDING;
}

export const formatSecondsToMMSS = (value) => {
    const minutes = Math.floor(value/60);
    const seconds = value - minutes * 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}`: `${seconds}`
    return `${minutes}:${formattedSeconds}`;
}

export const getWordPerMinute = (words, seconds) => {
    const entriesLength = words.join(' ').length;
    const minutes = seconds / 60;
    return Math.floor((entriesLength/AVERAGE_WORD_LENGTH)/minutes);
}