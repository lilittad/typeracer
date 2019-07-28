import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {formatSecondsToMMSS} from '../../../../../utils/formatter';
import {COUNT_DOWN_TIME} from '../../../../../configs/constants';

export default function Timer(props) {
    const [seconds, setSeconds] = useState(COUNT_DOWN_TIME);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => {
                const done = seconds === 0;
                if (done) {
                    clearInterval(interval);
                }
                props.onTick(COUNT_DOWN_TIME - seconds, done);
                return done? 0 : seconds - 1;
            });
        }, 1000);
        return () => clearInterval(interval);// eslint-disable-next-line
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
