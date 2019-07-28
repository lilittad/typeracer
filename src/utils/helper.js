import {AVERAGE_WORD_LENGTH} from '../configs/constants';

const LETTER_STATUS = {
    PENDING: "black",
    CORRECT: "limegreen",
}

export const getWordsFromText = (text) => {
    return text
        .trim()
        .split(' ');
}

export const getLetterStatus = (currentWordIndex, currentLetterIndex, wIndex, lIndex) => {
    if (wIndex < currentWordIndex || (wIndex === currentWordIndex && lIndex < currentLetterIndex)) {
        return LETTER_STATUS.CORRECT;
    }
    return LETTER_STATUS.PENDING;
}

export const getWordsPerMinute = (words, letters, seconds) => {
    if (!seconds) {
        return 0;
    }
    const entriesLength = getEntriesLength(words, letters);
    const minutes = seconds / 60;

    return Math.floor((entriesLength/AVERAGE_WORD_LENGTH)/minutes);
}

export const getCompletionPercent = (text, words, letters) => {
    const entriesLength = getEntriesLength(words, letters);
    return Math.floor(entriesLength * 100/text.length);
}

const getEntriesLength = (words, letters) => {
    return words.join(' ').length + letters.length;
}