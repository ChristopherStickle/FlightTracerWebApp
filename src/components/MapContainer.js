import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';
import {Stroke, Style} from "ol/style";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {LineString} from "ol/geom";
import {Feature} from "ol";

function MapContainer(props) {
    const [map, setMap] = useState(null);
    const [flights, setFlights] = useState([]);
    const mapRef = useRef();
    // the map is created when the component is mounted
    useEffect(() => {
        const mapObj = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
            ],
            view: new View({
                center: fromLonLat([-76.510498,43.455345]),
                zoom: 14
            }),
        });
        setMap(mapObj);
    }, []);

    // the flights are updated when the props are updated
    useEffect(() => {
        setFlights(props.flights);
    }, [props.flights]);

    // the map is updated when the flights are updated
    useEffect(() => {
        if (flights.length > 0) {
            /* for each flight in the flights array
                 for each waypoint in the flight
                     create a marker
                     add the marker to the map */
            for (let i = 0; i < flights.length; i++) {
                const coordinates = [];
                for (let j = 0; j < flights[i].waypoints.length; j++) {
                    const lon = flights[i].waypoints[j].longitude;
                    const lat = flights[i].waypoints[j].latitude;
                    coordinates.push([lon, lat]);
                }
                const lineString = new LineString(coordinates);
                lineString.transform('EPSG:4326', 'EPSG:3857');
                const feature = new Feature({
                    geometry: lineString,
                });
                const vectorSource = new VectorSource({
                    features: [feature],
                });
                const vectorLayer = new VectorLayer({
                    source: vectorSource,
                    style: new Style({
                        stroke: new Stroke({
                            color: 'red',
                            width: 3,
                        }),
                    }),
                });
                map.addLayer(vectorLayer);
                map.getView().fit(vectorSource.getExtent(), {padding: [50, 50, 50, 50]});
            }
        }
    }, [flights, map]);
    
    return (
        <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />
    );
}
export default MapContainer;