import React from "react";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

const Modal = props => {
    return (
        <CSSTransition
            in={props.showOn}
            timeout={300}
            classNames="edit"
            unmountOnExit
        >
            <div className="modal">
                <div className="modal-content">
                    <button className="close-btn" onClick={props.setOff}>
                        <i className="fa fa-times" />
                    </button>
                    <div className="form-area">{props.children}</div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default Modal;
