import React, { useState, useEffect } from "react";
import "./home.css";
import Info from "../component/info";
import * as dbService from "../services/databaseService";
import Map from "../component/map";
import PlaceList from "../component/PlaceList";

const Home = () => {
    const [places, setPlaces] = useState(null);
    const [currentPlace, setCurrentPlace] = useState({});
    const [isReady, setIsReady] = useState(false);
    const [mapMarker, setMapMarker] = useState({});

    useEffect(() => {
        dbService.getPlaces().then(_places => {
            setPlaces(_places);
            setIsReady(true);
        });
    }, [isReady]);

    const elementClick = _place => {
        if (isEmpty(currentPlace) || _place._id !== currentPlace._id) {
            getPlace(_place._id);
        }
    };

    const addElement = newPlace => {
        dbService.postPlace(newPlace).then(place => {
            setCurrentPlace(place);
            setPlaces([
                ...places,
                {
                    _id: place._id,
                    done: place.done,
                    name: place.name,
                },
            ]);
        });
    };

    const editElement = newPlace => {
        dbService.putPlace(newPlace, newPlace._id).then(() => {
            setCurrentPlace(newPlace);
            setPlaces(
                places.map(_place =>
                    newPlace._id === _place._id ? newPlace : _place
                )
            );
        });
    };

    const deleteElement = id => {
        dbService.deletePlace(id).then(() => {
            setCurrentPlace({});
            setIsReady(false);
        });
    };

    const getPlace = id => {
        dbService.getPlace(id).then(_place => {
            setCurrentPlace(_place);
        });
    };
    const isEmpty = obj => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true;
    };

    return (
        <div className="row2">
            <div className="column1">
                <div className="info-area">
                    {!isEmpty(currentPlace) && (
                        <Info
                            place={currentPlace}
                            ready={isReady}
                            editElement={editElement}
                            deleteElement={deleteElement}
                        />
                    )}
                </div>
                <div className="map-area">
                    <Map
                        updateMarker={() => setMapMarker}
                        place={currentPlace}
                    />
                </div>
            </div>
            <div className="column2">
                {places && (
                    <PlaceList
                        mapMarker={mapMarker}
                        addElement={addElement}
                        places={places}
                        elementClick={elementClick}
                    />
                )}
            </div>
        </div>
    );
};
export default Home;
