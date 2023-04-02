import React from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import 'ol/ol.css';


class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null
        }
    }
    componentDidMount() {
        const map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
            ],
            view: new View({
                center: fromLonLat([-76.510498,43.455345]),
                //center: fromLonLat([0,0]),
                zoom: 15
            })
        });

        this.setState({map: map});
    }
    render() {
        return (
            <div id="map" style={{width: '100%', height: '100vh'}}/>
        );
    }
}
export default MapContainer;