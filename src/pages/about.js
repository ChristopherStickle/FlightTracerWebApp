import React, {useEffect, useRef} from 'react';
import "./pages.css"
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import OSM from "ol/source/OSM";
import {fromLonLat} from "ol/proj";
import Map from 'ol/Map';


function About() {
    const mapRef = useRef();
    useEffect(() => {
        const mapObj = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
            ],
            view: new View({
                center: fromLonLat([-76.544908,43.452354]),
                zoom: 14
            }),
            controls: [],
        });
    }, []);

    return (
        <main className={"about-page"}>
            <div className={"map-banner"} ref={mapRef} />
            <h3>Background</h3>
            <p>
                At any given moment, there are hundreds, if not thousands of airplanes in the sky above us. These airplanes communicate with one another and with ground-based air traffic control centers using a technology called Automatic dependent surveillance—broadcast (ADS–B). ADS-B is a public signal that can be intercepted by hobbyists and enthusiasts and allow the systematic tracking of air traffic.
                <br/><br/>
                While several air traffic tracking providers exist, access to their data is proprietary and typically only allows for limited overview of historic flight data. Moreover, flight data is incomplete, e.g., only part of the trip of any given flight may be available.
            </p>
            <h3>Objective</h3>
            <p>
                The objective of this project is to design and implement a tool, which parses the proprietary access to the flight tracking providers in order to reconstruct and visualize the complete trip of some subset of flights. In contrast to the flight tracking providers themselves, not a live traffic of planes shall be visualized, but “historic” flights, i.e., flights which have been completed and are gap-free.
                <br/><br/>
                The flights are compiled from ADS-B data and interpolated using cubic splines. You can use the search menu to choose what flights you want to visualize on the map. Once visualized, flights can be converted and downloaded as an <a href={"https://developer.x-plane.com/article/flightplan-files-v11-fms-file-format/"}>v11 fms file</a> ready to load into X-Plane.
            </p>
            <h3>Who made it?</h3>
            <p>
                <li>
                    {"Keith Allen : "}
                    <a href={"https://github.com/KeithTAllen"}>GitHub</a>
                    {" : "}
                    <a href={"https://www.cs.oswego.edu/~kallen20/"}>Website</a>
                </li>
                <li>
                    {"David Hennigan : "}
                    <a href={"https://github.com/DeveloperDave17"}>GitHub</a>
                    {" : "}
                    <a href={"https://www.linkedin.com/in/david-hennigan-573754243/"}>LinkedIn</a>
                </li>
                <li>
                    {"Christopher Stickle  : "}
                    <a href={"https://github.com/ChristopherStickle"}>GitHub</a>
                    {" : "}
                    <a href={"https://www.linkedin.com/in/christopher-stickle-839733116/"}>LinkedIn</a>
                </li>
                <li>
                    {"Adil Tiba : "}
                    <a href={"https://github.com/adilion1"}>GitHub</a>
                </li>
                <li>
                    {"Emir Yigit Akpinar : "}
                    <a href={"https://github.com/emirakpinar"}>GitHub</a>
                    {" : "}
                    <a href={"https://www.linkedin.com/in/emirakpinar/"}>LinkedIn</a>
                </li>
            </p>
            <h3>Acknowledgements </h3>
            <p>This project would not be possible without the work of many others’ we would like to thank,
                <li> <a href={"https://ourairports.com/"}>OurAirports</a> for their extensive and up to date repository of the world’s airfields.</li>
                <li> <a href={"https://www.opensky-network.org"}>OpenSky Network</a>, for access and use of their ADS-B data.</li>
                <li> <a href={"https://openlayers.org/"}>OpenLayers</a> library, used for the map and its relevant renderings. Code licensed under the <a href={"https://www.tldrlegal.com/license/bsd-2-clause-license-(freebsd)"}>2-Clause BSD.</a></li>
            </p>
        </main>
    );
}

export default About;
