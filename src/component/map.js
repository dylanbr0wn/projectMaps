import React, { Component, useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import mapQuery from "mapbox-elevation";
import { MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import "mapbox-gl-style-switcher/styles.css";

import "./map.css";

export class MapArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: "",
            featuresLayer: "",
            point: "",
            elevation: "NA",
            writePoint: ["", ""],
            lng: "NA",
            lat: "NA",
            zoom: 8,
            marker: "",
        };
    }

    componentDidMount() {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: "mapbox://styles/mapbox/outdoors-v11?optimize=true",
            center: [-123.36, 48.43],
            zoom: this.state.zoom,
        });

        map.on("move", () => {
            this.setState({
                zoom: map.getZoom().toFixed(2),
            });
        });
        map.addControl(new mapboxgl.FullscreenControl());
        var marker = new mapboxgl.Marker({
            color: "#314ccd",
        });
        map.on("click", this.handleMapClick.bind(this));

        const styles = [
            {
                title: "Outdoors",
                uri: "mapbox://styles/mapbox/outdoors-v11",
            },
            {
                title: "Dark",
                uri: "mapbox://styles/mapbox/dark-v9",
            },
            {
                title: "Satellite",
                uri: "mapbox://styles/mapbox/satellite-v9",
            },
        ];

        map.addControl(new MapboxStyleSwitcherControl(styles));

        this.setState({ map: map, marker: marker });
    }
    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.selectedDest !== this.props.selectedDest &&
            this.state.map.loaded()
        ) {
            if (this.state.map.getLayer("points") !== undefined) {
                this.state.map.removeLayer("points");
                this.state.map.removeSource("points");
            }

            if ("coordinates" in this.props.selectedDest) {
                this.state.map.addSource("points", {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: [
                            {
                                type: "Feature",
                                geometry: {
                                    type: "Point",
                                    coordinates: [
                                        this.props.selectedDest.coordinates.lng,
                                        this.props.selectedDest.coordinates.lat,
                                    ],
                                },
                                properties: {
                                    title: this.props.selectedDest.name,
                                    icon: "mountain",
                                },
                            },
                        ],
                    },
                });
                this.state.map.addLayer({
                    id: "points",
                    type: "symbol",
                    source: "points",
                    layout: {
                        // get the icon name from the source's "icon" property
                        // concatenate the name to get an icon from the style's sprite sheet
                        "icon-image": ["concat", ["get", "icon"], "-15"],
                        // get the title name from the source's "title" property
                        "text-field": ["get", "title"],
                        "text-font": [
                            "Open Sans Semibold",
                            "Arial Unicode MS Bold",
                        ],
                        "text-offset": [0, 0.6],
                        "text-anchor": "top",
                    },
                });
                this.state.map.jumpTo({
                    center: [
                        this.props.selectedDest.coordinates.lng,
                        this.props.selectedDest.coordinates.lat,
                    ],
                    zoom: 10,
                });
            }
        }
    }

    handleMapClick(event) {
        this.setState({
            lng: event.lngLat.wrap().lng.toFixed(4),
            lat: event.lngLat.wrap().lat.toFixed(4),
        });
        this.state.marker.setLngLat(event.lngLat).addTo(this.state.map);

        var getElevation = mapQuery(process.env.REACT_APP_MAPBOX_TOKEN);
        getElevation(
            [event.lngLat.wrap().lng, event.lngLat.wrap().lat],
            (err, elevation) => {
                // const elevations = res.data.features.map(feat => feat.properties.ele).slice()
                // const maxEle = Math.max(...elevations);
                this.setState({ elevation: elevation });
                this.props.updateMarker({
                    lng: event.lngLat.wrap().lng,
                    lat: event.lngLat.wrap().lat,
                    ele: elevation,
                });
            }
        );
    }

    render() {
        return (
            <div className="mapContainer">
                <div className="sidebarStyle">
                    <div>
                        Longitude: {this.state.lng} | Latitude: {this.state.lat}{" "}
                        | Elevation:{" "}
                        {this.state.elevation !== "NA"
                            ? this.state.elevation.toFixed(4)
                            : this.state.elevation}{" "}
                        | Map Zoom: {this.state.zoom}
                    </div>
                </div>
                <div ref={el => (this.mapContainer = el)} className="map" />
            </div>
        );
    }
}

export const MapGPS = props => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);
    const [elevation, setElevation] = useState("NA");
    const [lng, setLng] = useState("NA");
    const [lat, setLat] = useState("NA");
    const [zoom, setZoom] = useState(8);
    const [marker, setMarker] = useState("");

    useEffect(() => {
        if (map === null) {
            mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

            const _map = new mapboxgl.Map({
                container: mapRef.current,
                style: "mapbox://styles/mapbox/outdoors-v11",
                center: [-123.36, 48.43],
                zoom: zoom,
            });

            _map.on("move", () => {
                setZoom(_map.getZoom().toFixed(2));
            });
            const styles = [
                {
                    title: "Outdoors",
                    uri: "mapbox://styles/mapbox/outdoors-v11",
                },
                {
                    title: "Dark",
                    uri: "mapbox://styles/mapbox/dark-v9",
                },
                {
                    title: "Satellite",
                    uri: "mapbox://styles/mapbox/satellite-v9",
                },
            ];

            _map.addControl(new MapboxStyleSwitcherControl(styles));

            _map.addControl(new mapboxgl.FullscreenControl());
            var _marker = new mapboxgl.Marker({
                color: "#314ccd",
            });

            _map.on("click", event => {
                setLng(event.lngLat.wrap().lng.toFixed(4));
                setLat(event.lngLat.wrap().lat.toFixed(4));
                _marker.setLngLat(event.lngLat).addTo(_map);
                var getElevation = mapQuery(process.env.REACT_APP_MAPBOX_TOKEN);
                getElevation(
                    [event.lngLat.wrap().lng, event.lngLat.wrap().lat],
                    (err, elevation) => {
                        setElevation(elevation);
                    }
                );
            });
            var geolocate = new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
            });
            // Add the control to the map.
            _map.addControl(geolocate);
            var nav = new mapboxgl.NavigationControl();
            _map.addControl(nav, "bottom-left");
            _map.touchZoomRotate.enable({ around: "center" });
            setMap(_map);
            setMarker(_marker);
        }
    }, [map, marker, zoom]);

    return (
        <div className="mapContainer">
            <div className="sidebarStyle">
                <div>
                    Longitude: {lng} | Latitude: {lat} | Elevation:{" "}
                    {elevation !== "NA" ? elevation.toFixed(4) : elevation} |
                    Map Zoom: {zoom}
                </div>
            </div>
            <div ref={mapRef} className="map" />
        </div>
    );
};
