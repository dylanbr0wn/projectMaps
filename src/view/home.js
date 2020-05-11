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
                    <div className="add-button">
                        <h2 className="column-title">Places</h2>

                        <AddButton mapMarker={this.state.mapMarker} addElement={this.addElement} />


                    </div>
                    <ListElements destList={this.state.dest} handleClick={this.elementClick} />
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
            <svg className="mountain-icon" version="1.1" id="mountain-15" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 15 15">
                <path id="path5571" d="M7.5,2C7.2,2,7.1,2.2,6.9,2.4&#xA;&#x9;l-5.8,9.5C1,12,1,12.2,1,12.3C1,12.8,1.4,13,1.7,13h11.6c0.4,0,0.7-0.2,0.7-0.7c0-0.2,0-0.2-0.1-0.4L8.2,2.4C8,2.2,7.8,2,7.5,2z&#xA;&#x9; M7.5,3.5L10.8,9H10L8.5,7.5L7.5,9l-1-1.5L5,9H4.1L7.5,3.5z" />
            </svg>
            {dest.name}
        </li>
    );
    const NotVisitedPlaces = () => props.destList
        .filter(place => place.done === false)
        .map(dest =>
            <li key={dest._id}
                onClick={() => handleClick(dest)}
            >
                <svg className="mountain-icon" version="1.1" id="mountain-15" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 15 15">
                    <path id="path5571" d="M7.5,2C7.2,2,7.1,2.2,6.9,2.4&#xA;&#x9;l-5.8,9.5C1,12,1,12.2,1,12.3C1,12.8,1.4,13,1.7,13h11.6c0.4,0,0.7-0.2,0.7-0.7c0-0.2,0-0.2-0.1-0.4L8.2,2.4C8,2.2,7.8,2,7.5,2z&#xA;&#x9; M7.5,3.5L10.8,9H10L8.5,7.5L7.5,9l-1-1.5L5,9H4.1L7.5,3.5z" />
                </svg> {dest.name}
            </li>
        );

    return (
        <div className="list-area">

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

