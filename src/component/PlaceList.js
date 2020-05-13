import React, { useState, useEffect } from "react";
import Modal from "./common/Modal";
import CircleActionButton from "./common/CircleActionButton";
import Input from "./input";
import "./PlaceList.css";
import PlaceListItem from "./PlaceListItem";

const PlaceList = props => {
    const [add, setAdd] = useState(false);
    const [visitedPlaces, setVisitedPlaces] = useState(
        props.places ? props.places.filter(place => place.done) : []
    );
    const [notVisitedPlaces, setNotVisitedPlaces] = useState(
        props.places ? props.places.filter(place => !place.done) : []
    );

    const addSubmit = place => {
        setAdd(false);
        props.addElement(place);
    };

    useEffect(() => {
        setVisitedPlaces(props.places.filter(place => place.done));
        setNotVisitedPlaces(props.places.filter(place => !place.done));
    }, [props.places]);

    return (
        <>
            <div className="add-button">
                <h2 className="column-title">Places</h2>
                <CircleActionButton
                    name="add"
                    label="Add Place"
                    onClick={() => setAdd(true)}
                    icon="plus"
                />
                <Modal showOn={add} setOff={() => setAdd(false)}>
                    <Input
                        type="add"
                        mapMarker={props.mapMarker}
                        onFormSubmit={addSubmit}
                    />
                </Modal>
            </div>
            <div className="list-area">
                <h2 className="list-title">Not Visited</h2>
                <ul>
                    {notVisitedPlaces.length !== 0 &&
                        notVisitedPlaces.map(place => (
                            <PlaceListItem
                                key={place._id}
                                place={place}
                                onClick={props.elementClick}
                            />
                        ))}
                </ul>
                <hr className="list-hr" />
                <h2 className="list-title">Visited</h2>
                <ul>
                    {visitedPlaces.length !== 0 &&
                        visitedPlaces.map(place => (
                            <PlaceListItem
                                key={place._id}
                                place={place}
                                onClick={props.elementClick}
                            />
                        ))}
                </ul>
            </div>
        </>
    );
};
export default PlaceList;
