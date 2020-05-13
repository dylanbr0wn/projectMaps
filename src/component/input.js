import React, { useState } from "react";
import "./input.css";

const Input = props => {
    const [place, setPlace] = useState(
        props.place
            ? props.place
            : {
                  name: "",
                  done: false,
                  elevation: "",
                  length: "",
                  coordinates: {
                      lng: "",
                      lat: "",
                  },
                  notes: "",
              }
    );

    const handleInputChange = ({ target }) => {
        let value = target.name === "done" ? target.checked : target.value;
        let name = target.name;
        if (name === "lng" || name === "lat") {
            name = "coordinates";
            value =
                target.name === "lng"
                    ? { lng: value, lat: place.coordinates.lat }
                    : { lng: place.coordinates.lng, lat: value };
        }
        let newPlace = { ...place };
        newPlace[name] = value;
        setPlace(newPlace);
    };
    const handleSubmit = event => {
        event.preventDefault();
        props.onFormSubmit(place);
    };

    const addMapMarkerInfo = () => {
        setPlace({
            ...place,
            elevation: this.props.mapMarker.ele,
            coordinates: {
                lng: this.props.mapMarker.lng,
                lat: this.props.mapMarker.lat,
            },
        });
    };

    return (
        <>
            <h2 className="add-title">
                {props.type === "edit" ? "Edit Place" : "Add Place"}
            </h2>
            {props.type === "add" && !isEmpty(props.mapMarker) && (
                <button
                    className="modal-add-map-btn"
                    onClick={addMapMarkerInfo}
                >
                    Add data from Marker
                    <i className="fa fa-plus" />
                </button>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form__group field">
                    <input
                        type="input"
                        className="form__field"
                        placeholder="Name"
                        name="name"
                        id="name"
                        value={place.name}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="name" className="form__label">
                        Name
                    </label>
                </div>

                <div className="form__group field">
                    <input
                        type="input"
                        className="form__field"
                        placeholder="Elevation"
                        name="elevation"
                        id="elevation"
                        value={place.elevation}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="elevation" className="form__label">
                        Elevation
                    </label>
                </div>

                <div className="form__group field">
                    <input
                        type="input"
                        className="form__field"
                        placeholder="Length"
                        name="length"
                        id="length"
                        value={place.length}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="length" className="form__label">
                        Length
                    </label>
                </div>
                <div className="form__group_2 field">
                    <input
                        type="input"
                        className="form__field_2"
                        placeholder="Longitude"
                        name="lng"
                        id="lng"
                        value={place.coordinates.lng}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="lng" className="form__label">
                        Longitude
                    </label>
                </div>
                <div className="form__group_2 field">
                    <input
                        type="input"
                        className="form__field_2"
                        placeholder="Latitude"
                        name="lat"
                        id="lat"
                        value={place.coordinates.lat}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="lat" className="form__label">
                        Latitude
                    </label>
                </div>
                <div className="form__group field">
                    <input
                        type="input"
                        className="form__field"
                        placeholder="Notes"
                        name="notes"
                        id="notes"
                        value={place.notes}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="notes" className="form__label">
                        Notes
                    </label>
                </div>
                <div className="form__group field">
                    <input
                        className="label-input"
                        name="done"
                        id="done"
                        type="checkbox"
                        checked={place.done}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="done" className="label-check">
                        <p className="label-label">Completed</p>
                    </label>
                </div>

                <input
                    className="modal-submit-btn"
                    type="submit"
                    value={props.type === "edit" ? "Make Changes" : "Add"}
                />
            </form>
        </>
    );
};

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
}

export default Input;
