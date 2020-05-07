import * as React from "react";
import mapboxgl from 'mapbox-gl';
import mapQuery from 'mapbox-elevation';

import './map.css';


export default class MapArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: '',
            featuresLayer: '',
            point: '',
            elevation: 'NA',
            writePoint: ['', ''],
            lng: "NA",
            lat: "NA",
            zoom: 8,
            marker: '',
        }

    }

    componentDidMount(){
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/outdoors-v11',
            center: [-123.36, 48.43],
            zoom: this.state.zoom
        });


        map.on('move', () => {
            this.setState({
                zoom: map.getZoom().toFixed(2)
            });
        });
        map.addControl(new mapboxgl.FullscreenControl());
        var marker = new mapboxgl.Marker({
            'color': '#314ccd'
        });
        map.on('click',this.handleMapClick.bind(this));


        this.setState({map:map,marker:marker});
    }
    componentDidUpdate(prevProps, prevState) {

        if(prevProps.selectedDest !== this.props.selectedDest && this.state.map.loaded())  {
            if(this.state.map.getLayer('points') !== undefined){
                this.state.map.removeLayer('points');
                this.state.map.removeSource('points');
            }

            if( 'coordinates' in this.props.selectedDest){
                this.state.map.addSource('points', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [
                                        this.props.selectedDest.coordinates.lng,
                                        this.props.selectedDest.coordinates.lat
                                    ]
                                },
                                'properties': {
                                    'title': this.props.selectedDest.name,
                                    'icon': 'mountain'
                                }
                            }
                        ]
                    }
                });
                this.state.map.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': 'points',
                    'layout': {
                        // get the icon name from the source's "icon" property
                        // concatenate the name to get an icon from the style's sprite sheet
                        'icon-image': ['concat', ['get', 'icon'], '-15'],
                        // get the title name from the source's "title" property
                        'text-field': ['get', 'title'],
                        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                        'text-offset': [0, 0.6],
                        'text-anchor': 'top'
                    }
                });
                this.state.map.jumpTo({center:[this.props.selectedDest.coordinates.lng, this.props.selectedDest.coordinates.lat],zoom:10 })

            }

        }

    }


    handleMapClick(event) {
        this.setState({lng: event.lngLat.wrap().lng.toFixed(4),lat:event.lngLat.wrap().lat.toFixed(4)})
        this.state.marker.setLngLat(event.lngLat).addTo(this.state.map);

        var getElevation = mapQuery(process.env.REACT_APP_MAPBOX_TOKEN)
        getElevation([event.lngLat.wrap().lng,event.lngLat.wrap().lat], (err, elevation) =>{
            // const elevations = res.data.features.map(feat => feat.properties.ele).slice()
            // const maxEle = Math.max(...elevations);
            this.setState({elevation: elevation})
            this.props.updateMarker({
                lng:event.lngLat.wrap().lng,
                lat: event.lngLat.wrap().lat,
                ele: elevation
            })
        })


    }

    render() {
        return (
            <div className="mapContainer">
                <div className='sidebarStyle'>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Elevation: {this.state.elevation !== 'NA' ? this.state.elevation.toFixed(4): this.state.elevation} | Map Zoom: {this.state.zoom}</div>
                </div>
                <div ref={el => this.mapContainer = el}  className="map"/>
            </div>
        )
    }



}