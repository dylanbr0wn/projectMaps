import * as React from "react";
import mapboxgl from 'mapbox-gl';

import './map.css';


export default class MapArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: '',
            featuresLayer: '',
            point: '',
            writePoint: ['',''],
            lng: 5,
            lat: 34,
            zoom: 2
        }
    }

    componentDidMount(){
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/outdoors-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
        map.addControl(new mapboxgl.FullscreenControl());
        map.on('click',this.handleMapClick.bind(this))
    }
    componentDidUpdate(prevProps, prevState) {


    }

    handleMapClick(event) {
        this.setState({point: event.lngLat.wrap()})
        console.log(this.state.point)


    }

    render() {
        return (
            <div className="mapContainer">
                <div className='sidebarStyle'>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                </div>
                <div ref={el => this.mapContainer = el}  className="map"/>
            </div>
        )
    }



}