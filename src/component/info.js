import React, { useState } from "react";
import "./info.css";
import Input from "./input";
import AnimatedTooltip from "./common/AnimatedToolTip";
import CircleActionButton from "./common/CircleActionButton";
import Modal from "./common/Modal";

const Info = props => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const editSubmit = place => {
        setShowEdit(false);
        props.editElement({ ...place, _id: props.place._id });
    };
    const deleteSubmit = () => {
        setShowDelete(false);
        props.deleteElement(props.place._id);
    };

    return (
        <div>
            {!showInfo && (
                <AnimatedTooltip label="Open Information">
                    <button
                        className="modal-info-btn"
                        onClick={() => setShowInfo(!showInfo)}
                    >
                        <i className="fa fa-info" />
                        {props.place.name}
                    </button>
                </AnimatedTooltip>
            )}
            {showInfo && (
                <div className="info-box">
                    <h2 className="info-title">
                        {props.place.name}
                        <CircleActionButton
                            label="Close Information"
                            name="close"
                            onClick={() => setShowInfo(!showInfo)}
                            icon="angle-double-left"
                        />
                        <CircleActionButton
                            label="Edit Place"
                            name="edit"
                            onClick={() => setShowEdit(!showEdit)}
                            icon="pencil"
                        />
                    </h2>
                    <hr className="info-hr" />
                    {props.place.length !== "" && (
                        <div className="info-line">
                            <span className="info-line-title">Distance: </span>{" "}
                            {props.place.length}km
                        </div>
                    )}
                    {props.place.elevation !== "" && (
                        <div className="info-line">
                            <span className="info-line-title">Elevation:</span>{" "}
                            {Math.round(props.place.elevation)}m
                        </div>
                    )}

                    <div className="info-line">
                        <span className="info-line-title">Visited:</span>{" "}
                        {props.place.done ? "Yes" : "No"}
                    </div>

                    {props.place.coordinates.lng !== "" && (
                        <div className="info-line">
                            <span className="info-line-title">
                                Coordinates:
                            </span>
                            <div>
                                {props.place.coordinates.lng.toFixed(4)},{" "}
                                {props.place.coordinates.lat.toFixed(4)}
                            </div>
                        </div>
                    )}
                    {props.place.notes !== "" && (
                        <div className="info-line">
                            <span className="info-line-title">Notes:</span>{" "}
                            {props.place.notes}
                        </div>
                    )}
                    <button
                        className="modal-delete-btn"
                        onClick={() => setShowDelete(!showDelete)}
                    >
                        <i className="fa fa-trash" />
                        Delete
                    </button>
                    <Modal
                        showOn={showDelete}
                        setOff={() => setShowDelete(!showDelete)}
                    >
                        <h2>Delete Place</h2>
                        <button
                            className="cancel-btn"
                            onClick={() => setShowDelete(!showDelete)}
                        >
                            {" "}
                            Cancel
                        </button>
                        <button className="confirm-btn" onClick={deleteSubmit}>
                            {" "}
                            Confirm
                        </button>
                    </Modal>
                    <Modal
                        showOn={showEdit}
                        setOff={() => setShowEdit(!showEdit)}
                    >
                        <Input
                            type="edit"
                            place={props.place}
                            onFormSubmit={editSubmit}
                        />
                    </Modal>
                </div>
            )}
        </div>
    );
};
export default Info;
