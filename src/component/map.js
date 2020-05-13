import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import mapQuery from "mapbox-elevation";
import { MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import "mapbox-gl-style-switcher/styles.css";

import "./map.css";

const Map = props => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);
    const [elevation, setElevation] = useState("NA");
    const [lng, setLng] = useState("NA");
    const [lat, setLat] = useState("NA");
    const [zoom, setZoom] = useState(null);
    const [marker, setMarker] = useState("");

    useEffect(() => {
        if (map === null) {
            mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

            const _map = new mapboxgl.Map({
                container: mapRef.current,
                style: "mapbox://styles/mapbox/outdoors-v11",
                center: [-123.36, 48.43],
                zoom: 8,
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
                        if (props.updateMarker) {
                            props.updateMarker({
                                lng: event.lngLat.wrap().lng,
                                lat: event.lngLat.wrap().lat,
                                ele: elevation,
                            });
                        }
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
            _map.addControl(nav, "bottom-right");
            _map.touchZoomRotate.enable({ around: "center" });
            setMap(_map);
            setMarker(_marker);
        } else if (props.selectedDest && map.loaded()) {
            if (map.getLayer("points") !== undefined) {
                map.removeLayer("points");
                map.removeSource("points");
            }

            if ("coordinates" in props.selectedDest) {
                map.addSource("points", {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: [
                            {
                                type: "Feature",
                                geometry: {
                                    type: "Point",
                                    coordinates: [
                                        props.selectedDest.coordinates.lng,
                                        props.selectedDest.coordinates.lat,
                                    ],
                                },
                                properties: {
                                    title: props.selectedDest.name,
                                    icon: "mountain",
                                },
                            },
                        ],
                    },
                });
                map.addLayer({
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
                map.jumpTo({
                    center: [
                        props.selectedDest.coordinates.lng,
                        props.selectedDest.coordinates.lat,
                    ],
                    zoom: 10,
                });
            }
        }
    }, [map, marker, props, props.selectedDest]);

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

export default Map;
