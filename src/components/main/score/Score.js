import React from 'react';
import PropTypes from 'prop-types';

import './score.css';

export default function Score(props) {
    return (
        <div className={`score score_${props.mode}`}>
            Your score is <span className="score__info">{props.score}</span> WPM
        </div>
    );
}

Score.propTypes = {
    score: PropTypes.number.isRequired,
    mode: PropTypes.string
};

Score.defaultProps = {
    mode: 'secondary'
};


