import React from 'react';
import PropTypes from 'prop-types';

import './score.css';

export default function Score(props) {
    return (
        <div className={`score score_${props.mode}`}>
            <div>Your score is</div>
            <div>
                <span className="score__info">{props.score}</span> WPM
            </div>
            {props.mode === "primary" &&
                <div>
                    <span className="score__info">{props.completionPercent}</span> %
                </div>
            }
        </div>
    );
}

Score.propTypes = {
    score: PropTypes.number.isRequired,
    completionPercent: PropTypes.number,
    mode: PropTypes.string
};

Score.defaultProps = {
    mode: 'secondary',
    completionPercent: 0
};


