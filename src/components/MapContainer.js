import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';

function MapContainer() {
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);

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
                zoom: 15
            })
        });

        setMap(mapObj);
    }, []);

    return (
        <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />
    );
}

export default MapContainer;
