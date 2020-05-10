import React, { Component } from 'react';
import './home.css';
import Info from '../component/info';
import dbService from '../services/databaseService';
import { MapArea } from '../component/map'
import AddButton from "../component/addButton";


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dest: [1, 1],
            selectedDest: {},
            ready: false,
            mapMarker: {},
        };
    };

    componentDidMount() {
        this.getPlaces()
    }


    elementClick = (dest) => {
        if (dest._id !== this.state.selectedDest._id) {
            this.getPlace(dest._id)
        }
    };

    updateMapMarker = (marker) => {
        this.setState({ mapMarker: marker })
    };

    addElement = (place) => {
        dbService.postPlace(place)
            .then(res => {
                this.setState({ selectedDest: res.data })
                this.getPlaces()
            }).catch(error => {
                console.log(error)
            });
    };

    editElement = (place) => {
        this.setState({ selectedDest: place })
        dbService.putPlace(place, place._id)
            .then(() => {
                this.getPlaces()
            }).catch(error => {
                console.log(error)
            });
    };

    deleteElement = (id) => {
        dbService.deletePlace(id)
            .then(() => {
                this.setState({ selectedDest: {}, ready: false })
                this.getPlaces()
            }).catch(error => {
                console.log(error)
            });
    };

    getPlaces = () => {
        dbService.getPlaces()
            .then(res => {
                this.setState({
                    dest: res.data
                });
                if (!isEmpty(this.state.selectedDest)) {
                    this.getPlace(this.state.selectedDest._id);
                }
            }).catch(error => {
                console.log(error)
            });
    };

    getPlace = (id) => {
        dbService.getPlace(id)
            .then(res => {
                this.setState({ selectedDest: res.data, ready: true })
            }).catch(error => {
                console.log(error)
            });
    };

    render() {
        return (

            <div className="row2">

                <div className="column1">
                    <div className="info-area">
                        {this.state.ready &&
                            <Info dest={this.state.selectedDest} ready={this.state.ready} editElement={this.editElement} deleteElement={this.deleteElement} />
                        }

                    </div>
                    <div className="map-area">
                        <MapArea updateMarker={this.updateMapMarker} ready={this.state.ready} selectedDest={this.state.selectedDest} />
                    </div>
                </div>
                <div className="column2">
                    <ListElements destList={this.state.dest} handleClick={this.elementClick} />
                    <div className="add-button">
                        <AddButton mapMarker={this.state.mapMarker} addElement={this.addElement} />
                    </div>
                </div>
            </div>

        );
    }

}

const ListElements = (props) => {
    const handleClick = (dest) => {
        props.handleClick(dest);
    }

    const VisitedPlaces = () => props.destList.filter(place => place.done === true).map(dest =>
        <li key={dest._id}
            onClick={() => handleClick(dest)}
        >
            {dest.name}
        </li>
    );
    const NotVisitedPlaces = () => props.destList
        .filter(place => place.done === false)
        .map(dest =>
            <li key={dest._id}
                onClick={() => handleClick(dest)}
            >
                {dest.name}
            </li>
        );

    return (
        <div className="list-area">
            <h2 className="column-title">Places</h2>
            <h2 className="list-title">Not Visited</h2>
            <ul>
                <NotVisitedPlaces />
            </ul>
            <hr className="list-hr" />
            <h2 className="list-title">Visited</h2>
            <ul>
                <VisitedPlaces />
            </ul>
        </div>

    )
};

const isEmpty = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

