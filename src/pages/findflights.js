import React, {useState} from 'react';
import MapContainer from "../components/MapContainer";
import SearchMenu from "../components/SearchMenu";
import ResultsPopup from "../components/Results-Popup";
import "./table.css"
import airportData from "./airports.json";

function Findflights (){
    //-----------------------------------------------------------------------------------------------------------------
    // search menu functions & variables |
    //------------------------------------
    const [formData, setFormData] = useState({});
    const handleFormSubmit = (formStates) => {
        clearResultsTable();
        // set the form data to the formStates
        setFormData(formStates);
        //alert("Form Submitted" + JSON.stringify(formStates, null, 2));
        const query = formStates;
        fetch("http://localhost:51261/submitAirplaneTracer", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(query)
        }).then(res=>res.json()).then((result)=>{
            //alert("Query response: "+JSON.stringify(result, null, 2));
            loadResultsTable(result);
        });
        togglePopup();
    }
    //-----------------------------------------------------------------------------------------------------------------
    // Results popup functions & variables |
    //--------------------------------------
    const [resultTable, setResultTable] = useState([]);
    const [showPopup, setShowPopup] = React.useState(false);
    const [selectedFlights, setSelectedFlights] = useState([]);
    const togglePopup = () => {
        setShowPopup(!showPopup);
        setSelectedFlights([]);
    }
    function clearResultsTable() {
        setResultTable([]);
    }
    function handleCheck(e, flight) {
        // if checked then add to selectedFlights
        // if unchecked then remove from selectedFlights
        if (e.target.checked) {
            setSelectedFlights(selectedFlights => [...selectedFlights, flight]);
        } else {
            setSelectedFlights(selectedFlights => selectedFlights.filter(f => f !== flight));
        }
    }
    function handleLoad () {
        togglePopup();
        // make an alert to show the selected flights and their values
        //alert("In handleLoad: "+ JSON.stringify(selectedFlights, null, 2));
        // query the database for the selected flights
        const flightIds = selectedFlights.map(flight => flight.flightId);
        fetch("http://localhost:51261/resultsAirplaneTracer", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(flightIds)
        }).then(res=>res.json())
            .then((result)=>{
                //alert("Query response: "+JSON.stringify(result, null, 2));
                // make flight objects from the query results
                makeFlightObjects(selectedFlights, result);
        });
    }
    function loadResultsTable (result) {
        // load the 'resultTable' with the key value pairs of the 'result' object from the Query response
        for (let i = 0; i < result.length; i++) {
            setResultTable(resultTable => [...resultTable, {
                flightId: result[i].flightId,
                callsign: result[i].callsign,
                aircraft: result[i].aircraft,
                icao24: result[i].icao24,
                departureAirport: result[i].departureAirport,
                arrivalAirport: result[i].arrivalAirport,
                departureDateTime: result[i].departureDateTime,
                arrivalDateTime: result[i].arrivalDateTime,
                flight_duration: result[i].flight_duration
            }]);
        }
    }
    //-----------------------------------------------------------------------------------------------------------------
    // Make Flight Objects |
    //----------------------
    const [flights, setFlights] = useState([]);
    function Flight (flightId, callsign, aircraft, icao24, departureAirport, arrivalAirport, departureDateTime, arrivalDateTime, flight_duration, waypoints) {
        this.flightId = flightId;
        this.callsign = callsign;
        this.aircraft = aircraft;
        this.icao24 = icao24;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.departureDateTime = departureDateTime;
        this.arrivalDateTime = arrivalDateTime;
        this.flight_duration = flight_duration;
        this.waypoints = waypoints;
    }
    function makeFlightObjects (selectedFlights, waypointQueryResults) {
        let flights = [];
        for (let i = 0; i < selectedFlights.length; i++) {
            flights.push(
                new Flight(
                    selectedFlights[i].flightId,
                    selectedFlights[i].callsign,
                    selectedFlights[i].aircraft,
                    selectedFlights[i].icao24,
                    selectedFlights[i].departureAirport,
                    selectedFlights[i].arrivalAirport,
                    selectedFlights[i].departureDateTime,
                    selectedFlights[i].arrivalDateTime,
                    selectedFlights[i].flight_duration,
                    waypointQueryResults[i]
                )
            );
        }
        return setFlights(flights);
    }
    //-----------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------
    return(
        <main>
            <center id="search--title">Search Menu</center>
            <SearchMenu placeholder={"Enter an Airfield..."} data = {airportData} onFormSubmit={handleFormSubmit} />
            <MapContainer flights = {flights} />
            { showPopup && <ResultsPopup
                handleClose={togglePopup}
                handleLoad={handleLoad}
                content={
                    <table id = "resultTable">
                        <thead>
                        <tr>
                            <th>Selected</th>
                            <th>Call Sign</th>
                            <th>Aircraft</th>
                            <th>ICAO24</th>
                            <th>Departure</th>
                            <th>Arrival</th>
                            <th>Departure DateTime</th>
                            <th>Arrival DateTime</th>
                            <th>Flight Duration</th>
                        </tr>
                        </thead>
                        <tbody>
                        {resultTable.map((flight, index) => (
                            <tr key={index}>
                                <td><input type="checkbox" name="selected" value={flight} onChange={e => handleCheck(e, flight)}/></td>
                                <td>{flight.callsign}</td>
                                <td>{flight.aircraft}</td>
                                <td>{flight.icao24}</td>
                                <td>{flight.departureAirport}</td>
                                <td>{flight.arrivalAirport}</td>
                                <td>{flight.departureDateTime}</td>
                                <td>{flight.arrivalDateTime}</td>
                                <td>{flight.flight_duration}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                }
            />}
        </main>
    );
}
export default Findflights;