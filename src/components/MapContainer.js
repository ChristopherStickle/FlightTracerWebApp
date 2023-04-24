import React, {useEffect, useRef, useState} from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import 'ol/ol.css';
import {Stroke, Style} from "ol/style";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {LineString} from "ol/geom";
import {Feature} from "ol";
import "./mapContainer.css";

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
                            color: flights[i].color,
                            width: 3,
                        }),
                    }),
                });
                map.addLayer(vectorLayer);
                map.getView().fit(vectorSource.getExtent(), {padding: [50, 50, 50, 50]});
            }
        }
    }, [flights, map]);
    //-----------------------------------------------------------------------------------------------------------------
    // Legend Panel - Flights Table, buttons |
    //----------------------------------------
    const [selectedFlights, setSelectedFlights] = useState([]);

    const handleCheck = (e, flight) => {
        if (e.target.checked) {
            setSelectedFlights([...selectedFlights, flight]);
        } else {
            setSelectedFlights(selectedFlights.filter(f => f !== flight));
        }
    }

    const handleIndexClick = (flight) => {
        //zoom map to selected flight
        const start = flight.waypoints[0];
        const coordinates = [start.longitude, start.latitude];
        map.getView().setZoom(12);
        map.getView().setRotation(0);
        map.getView().setCenter(fromLonLat(coordinates));
    }
    const handleClear = () => {
        setSelectedFlights([]);
        window.location.reload();
    }
    const handleDownload = () => {
        const flightIds = selectedFlights.map(flight => flight.flightId);
        //alert("Flight IDs: "+flightIds);
        fetch("http://localhost:51261/zip", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(flightIds)
        }).then(res=>res.blob())
            .then(blob=>{
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'flights.zip');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
    }
    
    return (
        <div className={"map-page-body"}>
        <div className={"mapContainer"} ref={mapRef} />
        { (flights.length > 0) && (
                <div className={"FlightLegendPanel"}>
                {<table className= "PathTable">
                    <thead>
                    <tr>
                        <th>Selected</th>
                        <th>Call Sign</th>
                        <th>ICAO24</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th>Departure DateTime</th>
                        <th>Arrival DateTime</th>
                        <th>Flight Duration</th>
                    </tr>
                    </thead>
                    <tbody>
                    {flights.map((flight, index) => (
                        <tr key={index} onClick={event => handleIndexClick(flight)}>
                            <td>
                                <input type="checkbox"
                                       name="selected"
                                       value={flight}
                                       //onChange={e => handleCheck(e, flight)}
                                       style={{visibility: "hidden"}}
                                />
                            <span className={"colored-checkbox"}
                                  style={{
                                      top: "50%",
                                      left: "10%",
                                      width: "50px",
                                      height: "50px",
                                      background: flight.color,
                                      display: "inline-block",
                                      position: "relative",
                                      cursor: "pointer",
                                  }}
                                  onClick={() => { // toggle the checkbox
                                      const checkbox = document.getElementsByName("selected")[index];
                                      checkbox.checked = !checkbox.checked;
                                      handleCheck({ target: checkbox }, flight);
                                  }}
                            >
                            <span
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: "15px",
                                    height: "15px",
                                    background: "white",
                                    visibility: selectedFlights.includes(flight) ? "visible" : "hidden"
                                }}
                            ></span>
                            </span>
                            </td>
                            <td>{flight.callsign}</td>
                            <td>{flight.icao24}</td>
                            <td>{flight.departureAirport}</td>
                            <td>{flight.arrivalAirport}</td>
                            <td>{flight.departureDateTime}</td>
                            <td>{flight.arrivalDateTime}</td>
                            <td>{flight.flightDuration}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>}
                <button className="btn-clear-FP" onClick={handleClear}>Clear Map</button>
                <button className="btn-Dwnld-FP" onClick={handleDownload}>Download</button>
            </div>)}
        </div>
    );
}
export default MapContainer;