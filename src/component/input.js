import React, { Component } from "react";
import './input.css'


class EditInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            done: false,
            elevation: '',
            length: '',
            coordinates: {
                lng: '',
                lat: ''
            },
            notes: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.setState({
            name: this.props.place.name,
            done: this.props.place.done,
            elevation: this.props.place.elevation,
            coordinates: this.props.place.coordinates,
            length: this.props.place.length,
            notes: this.props.place.notes
        });
    }
    handleInputChange(event) {
        const target = event.target;
        let value = target.name === 'done' ? target.checked : target.value;
        let name = target.name;
        if (name === "lng" || name === "lat") {
            name = 'coordinates';
            value = target.name === "lng" ? { lng: value, lat: this.state.coordinates.lat } : { lng: this.state.coordinates.lng, lat: value };
        }
        this.setState({
            [name]: value
        });

    }
    handleSubmit(event) {
        event.preventDefault();
        const place = {
            _id: this.props.place._id,
            ...this.state
        }
        this.props.onFormSubmit(place);
        this.setState({
            name: '',
            done: false,
            elevation: '',
            length: '',
            coordinates: {
                lng: '',
                lat: ''
            },
            notes: ''
        });

    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form__group field">
                    <input type="input"
                        className="form__field"
                        placeholder="Name"
                        name="name"
                        id="name"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        required />
                    <label htmlFor="name" className="form__label">Name</label>
                </div>

                <div className="form__group field">
                    <input type="input"
                        className="form__field"
                        placeholder="Elevation"
                        name="elevation"
                        id="elevation"
                        value={this.state.elevation}
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="elevation" className="form__label">Elevation</label>
                </div>

                <div className="form__group field">
                    <input type="input"
                        className="form__field"
                        placeholder="Length"
                        name="length"
                        id="length"
                        value={this.state.length}
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="length" className="form__label">Length</label>
                </div>
                <div className="form__group_2 field">
                    <input type="input"
                        className="form__field_2"
                        placeholder="Longitude"
                        name="lng"
                        id="lng"
                        value={this.state.coordinates.lng}
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="lng" className="form__label">Longitude</label>
                </div>
                <div className="form__group_2 field">

                    <input type="input"
                        className="form__field_2"
                        placeholder="Latitude"
                        name="lat"
                        id="lat"
                        value={this.state.coordinates.lat}
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="lat" className="form__label">Latitude</label>
                </div>
                <div className="form__group field">

                    <input type="input"
                        className="form__field"
                        placeholder="Notes"
                        name="notes"
                        id="notes"
                        value={this.state.notes}
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="notes" className="form__label">Notes</label>
                </div>
                <div className="form__group field">
                    <input
                        className="label-input"
                        name="done"
                        id="done"
                        type="checkbox"
                        checked={this.state.done}
                        onChange={this.handleInputChange} />
                    <label htmlFor="done" className="label-check"><p className="label-label">Completed</p></label>
                </div>

                <input className="modal-submit-btn-edit" type="submit" value="Make Changes" />
            </form>
        )
    }

}

class AddInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            done: false,
            elevation: '',
            length: '',
            coordinates: {
                lng: '',
                lat: ''
            },
            notes: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {

    }
    handleInputChange(event) {
        const target = event.target;
        let value = target.name === 'done' ? target.checked : target.value;
        let name = target.name;
        if (name === "lng" || name === "lat") {
            name = 'coordinates';
            value = target.name === "lng" ? { lng: value, lat: this.state.coordinates.lat } : { lng: this.state.coordinates.lng, lat: value };
        }
        this.setState({
            [name]: value
        });

    }
    handleSubmit(event) {
        event.preventDefault();
        const place = {
            ...this.state
        }
        this.props.onFormSubmit(place);
        this.setState({
            name: '',
            done: false,
            elevation: '',
            length: '',
            notes: '',
            coordinates: {
                lng: '',
                lat: ''
            }
        });





    }
    addMapMarkerInfo() {
        this.setState({ elevation: this.props.mapMarker.ele, coordinates: { lng: this.props.mapMarker.lng, lat: this.props.mapMarker.lat } })
    }

    render() {

        return (
            <div>
                <h2 className="add-title">New Place
                </h2>
                {!isEmpty(this.props.mapMarker) &&
                    <button className="modal-add-map-btn" onClick={this.addMapMarkerInfo.bind(this)}>
                        Add data from Marker<i className="fa fa-plus" />
                    </button>
                }

                <form onSubmit={this.handleSubmit}>


                    <div className="form__group field">
                        <input type="input"
                            className="form__field"
                            placeholder="Name"
                            name="name"
                            id="name"
                            value={this.state.name}
                            onChange={this.handleInputChange}
                            required />
                        <label htmlFor="name" className="form__label">Name</label>
                    </div>

                    <div className="form__group field">
                        <input type="input"
                            className="form__field"
                            placeholder="Elevation"
                            name="elevation"
                            id="elevation"
                            value={this.state.elevation}
                            onChange={this.handleInputChange}
                        />
                        <label htmlFor="elevation" className="form__label">Elevation</label>
                    </div>

                    <div className="form__group field">
                        <input type="input"
                            className="form__field"
                            placeholder="Length"
                            name="length"
                            id="length"
                            value={this.state.length}
                            onChange={this.handleInputChange}
                        />
                        <label htmlFor="length" className="form__label">Length</label>
                    </div>
                    <div className="form__group_2 field">
                        <input type="input"
                            className="form__field_2"
                            placeholder="Longitude"
                            name="lng"
                            id="lng"
                            value={this.state.coordinates.lng}
                            onChange={this.handleInputChange}
                        />
                        <label htmlFor="lng" className="form__label">Longitude</label>
                    </div>
                    <div className="form__group_2 field">

                        <input type="input"
                            className="form__field_2"
                            placeholder="Latitude"
                            name="lat"
                            id="lat"
                            value={this.state.coordinates.lat}
                            onChange={this.handleInputChange}
                        />
                        <label htmlFor="lat" className="form__label">Latitude</label>
                    </div>
                    <div className="form__group field">

                        <input type="input"
                            className="form__field"
                            placeholder="Notes"
                            name="notes"
                            id="notes"
                            value={this.state.notes}
                            onChange={this.handleInputChange}
                        />
                        <label htmlFor="notes" className="form__label">Notes</label>
                    </div>
                    <div className="form__group field">
                        <input
                            className="label-input"
                            name="done"
                            id="done"
                            type="checkbox"
                            checked={this.state.done}
                            onChange={this.handleInputChange} />
                        <label htmlFor="done" className="label-check"><p className="label-label">Completed</p></label>
                    </div>

                    <input className="modal-submit-btn" type="submit" value="Add" />
                </form>
            </div>

        )
    }

}

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export { AddInput, EditInput }