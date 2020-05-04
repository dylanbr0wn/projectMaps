import 'ol/ol.css';
import * as React from "react";
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import {Vector as VectorLayer} from 'ol/layer';
import {defaults as defaultControls} from 'ol/control';
import MousePosition from 'ol/control/MousePosition';
import {createStringXY} from 'ol/coordinate';
import { OSM,Vector as VectorSource } from 'ol/source';
import {WKT} from 'ol/format';
import {Point} from 'ol/geom';
import {Feature} from 'ol';
import ReactDOM from 'react-dom';
import {toLonLat} from 'ol/proj';

import './map.css';





export default class MapArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: '',
            featuresLayer: '',
            point: '',
            writePoint: ['','']
        }
        this.mapRef = null
        this.setMapRef = element => {
            this.mapRef = element;
        };
    }

    componentDidMount(){

        const mousePositionControl = new MousePosition({
            coordinateFormat: createStringXY(4),
            projection: 'EPSG:4326',
            // comment the following two lines to have the mouse position
            // be placed within the map.

            undefinedHTML: '&nbsp;'
        });
        var featuresLayer = new VectorLayer({
            source: new VectorSource({
                features:[]
            })
        });
        var map = new Map({
            controls: defaultControls().extend([mousePositionControl]),
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                featuresLayer
            ],
            target: this.mapRef,
            view: new View({
                center: [-13732276.700227, 6179475.114687],
                zoom: 10,
            })
        })
        map.on('click', this.handleMapClick.bind(this));

        this.setState({
            map: map,
            featuresLayer: featuresLayer
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.point !== this.state.point && this.state.featuresLayer !== ''){
            const point = this.state.point
            var featurething = new Feature({
                name: "Point",
            });
            featurething.setGeometry(point)
            let vectorSource = new VectorSource({})
            vectorSource.addFeature(featurething)
            this.state.featuresLayer.setSource(
                vectorSource
            );
        }

    }

    handleMapClick(event) {

        // create WKT writer
        var wktWriter = new WKT();

        // derive map coordinate (references map from Wrapper Component state)
        var clickedCoordinate = this.state.map.getCoordinateFromPixel(event.pixel);
        let coord = toLonLat(clickedCoordinate,'EPSG:3857')


        var clickedPointGeom = new Point( clickedCoordinate );

        // write Point geometry to WKT with wktWriter
        var clickedPointWkt = wktWriter.writeGeometry( clickedPointGeom );

        // place Flux Action call to notify Store map coordinate was clicked
        console.log(clickedPointGeom);
        this.setState({point: clickedPointGeom, writePoint: coord})



    }

    render(){

        return(
            <div className="map-container">
                <span className="position-text">{`Clicked: ${parseFloat(this.state.writePoint[0]).toFixed(4)}, ${parseFloat(this.state.writePoint[1]).toFixed(4)}`}</span>
                <div ref={this.setMapRef} className="map"/>
            </div>
        )
    }



}