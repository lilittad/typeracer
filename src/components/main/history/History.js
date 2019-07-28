import React from 'react';
import PropTypes from 'prop-types';

import './history.css';

export default function History(props) {
    const {races} = props;
    return (
        <div className="history">
            <div className="history__title"> History</div>
            <table className="history__table">
                <tbody>
                <tr>
                    <th>UserName</th>
                    <th>Score(wpm)</th>
                    <th>Completion(%)</th>
                </tr>
                {races.map((race, index) =>
                    <tr key={index}>
                        <th>{race.userName}</th>
                        <th>{race.score}</th>
                        <th>{race.completionPercent}</th>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

History.propTypes = {
    races: PropTypes.array,
};

History.defaultProps = { races: [] };
