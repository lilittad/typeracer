export const formatText = (text) => {
    return text.replace(/\s+/g, ' ');
}

export const formatSecondsToMMSS = (value) => {
    const minutes = Math.floor(value/60);
    const seconds = value - minutes * 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}`: `${seconds}`
    return `${minutes}:${formattedSeconds}`;
}
