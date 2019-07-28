import React from 'react';
import PropTypes from 'prop-types';

import './modal.css';

export default function Modal(props) {
    if (!props.show) {
        return '';
    }
    return (
        <div className="modal">
            <section className="modal__content">
                {props.children}
            </section>
        </div>
    );
}

Modal.propTypes = {
    show: PropTypes.bool,
};

Modal.defaultProps = {
    mode: false
};