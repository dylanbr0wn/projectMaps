import { AddInput } from "./input";
import { CSSTransition } from "react-transition-group";
import React, { useState, Fragment } from "react";
import './addButton.css'
import AnimatedTooltip from './tooltip';

const AddButton = (props) => {
    const [add, setAdd] = useState(false);

    const addSubmit = (place) => {
        setAdd(false);
        props.addElement(place);
    }

    return (
        <Fragment>
            <AnimatedTooltip label="Add Place">
                <button className="modal-add-btn" onClick={() => setAdd(true)}>
                    <i className="fa fa-plus" />
                </button>
            </AnimatedTooltip>

            <CSSTransition
                in={add}
                timeout={300}
                classNames="edit"
                unmountOnExit
            >
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setAdd(false)}>
                            <i className="fa fa-times" />
                        </button>
                        <div className="form-area">
                            <AddInput mapMarker={props.mapMarker} onFormSubmit={addSubmit} />
                        </div>
                    </div>
                </div>

            </CSSTransition>
        </Fragment>

    )
};

export default AddButton;