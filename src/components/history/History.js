import React, {useState} from 'react';
import PropTypes from 'prop-types';

import './history.css';

export default function History(props) {
    return (
        <div className="history">
            {props.text}
        </div>
    );
}

History.propTypes = {
    text: PropTypes.string,
};

History.defaultProps = { text: '' };
