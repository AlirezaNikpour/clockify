import React from 'react';
import style from './Modal.module.css';

function Modal(props) {
    const { isOpen, onClose, children } = props;

    if (!isOpen) {
        return null;
    }

    return (
        <div className={style[`modal-wrapper`]}>
            <div className={style[`modal-container`]}>
                {children}
            </div>
            <div className={style[`modal-backdrop`]} onClick={onClose}></div>
        </div>
    )
}

export default Modal;
