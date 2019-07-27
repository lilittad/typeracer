import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {formatSecondsToMMSS} from '../../../../utils/utils';
import {COUNT_DOWN_TIME} from '../../../../configs/constants';

export default function Timer(props) {
    const [seconds, setSeconds] = useState(COUNT_DOWN_TIME);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds - 1);
            props.onTick(COUNT_DOWN_TIME - seconds - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {formatSecondsToMMSS(seconds)}
        </div>
    );
}

Timer.propTypes = {
    onTick: PropTypes.func.isRequired
};
