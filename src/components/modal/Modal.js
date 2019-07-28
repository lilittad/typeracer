import React from 'react';

import './modal.css';

export default function Login(props) {
    if (!props.show) {
        return null;
    }
    return (
        <div className="modal">
            <section className="modal__content">
                {props.children}
            </section>
        </div>
    );
}
