import React, {useState} from 'react';
import MapContainer from "../components/MapContainer";
import SearchMenu from "../components/SearchMenu";
import ResultsPopup from "../components/Results-Popup";
import "./table.css"
import airportData from "./airportsReduced.json";

function Findflights (){
    //-----------------------------------------------------------------------------------------------------------------
    // search menu functions & variables |
    //------------------------------------
    const [formData, setFormData] = useState({});
    const handleFormSubmit = (formStates) => {
        clearResultsTable();
        // set the form data to the formStates
        setFormData(formStates);
        alert("Form Submitted" + JSON.stringify(formStates, null, 2));
        const query = formStates;
        fetch("http://localhost:51261/submitAirplaneTracer", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(query)
        }).then(res=>res.json()).then((result)=>{
            alert("Query response: "+JSON.stringify(result, null, 2));
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
    function handleCheck (e) {
        // if checked then add to selectedFlights
        // if unchecked then remove from selectedFlights
        if (e.target.checked) {
            setSelectedFlights(selectedFlights => [...selectedFlights, e.target.value]);
        } else {
            setSelectedFlights(selectedFlights.filter(flight => flight !== e.target.value));
        }
    }
    function handleLoad () {
        togglePopup();
        // make an alert to show the selected flights and their values
        alert("Selected flights: "+ selectedFlights);
        // query the database for the selected flights
        const query = selectedFlights;
        fetch("http://localhost:51261/submitAirplaneTracer", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(query)
        }).then(res=>res.json()).then((result)=>{
            alert("Query response: "+JSON.stringify(result, null, 2));
            // send the selected flights to the map for display
            loadFlightData(result);
            passToMap(flightData);
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
    // Map functions & variables |
    //----------------------------
    const [flightData, setFlightData] = useState([]);
    function loadFlightData (result) {
        // load the 'flightData' with the key value pairs of the 'result' object from the Query response
        for (let i = 0; i < result.length; i++) {
            setFlightData(flightData => [...flightData, {
                //TODO: Change these to include waypoints etc...
                /*flightId: result[i].flightId,
                callsign: result[i].callsign,
                aircraft: result[i].aircraft,
                icao24: result[i].icao24,
                departureAirport: result[i].departureAirport,
                arrivalAirport: result[i].arrivalAirport,
                departureDateTime: result[i].departureDateTime,
                arrivalDateTime: result[i].arrivalDateTime,
                flight_duration: result[i].flight_duration*/
            }]);
        }
    }
    function passToMap (result) {
        //TODO: Pass the flightData to the map -- create required MapContainer functions&variables
    }

    //-----------------------------------------------------------------------------------------------------------------
    return(
        <body>
            <center id="search--title">Search Menu</center>
            <SearchMenu placeholder={"Enter an Airfield..."} data = {airportData} onFormSubmit={handleFormSubmit} />
            <MapContainer />
            { showPopup && <ResultsPopup
                handleClose={togglePopup}
                handleLoad={handleLoad}
                content={
                    <table id = "resultTable">
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
                        {resultTable.map((flight, index) => (
                            <tr >
                                <td><input type="checkbox" name="selected" value={flight.flightId} onChange={handleCheck}/></td>
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
                    </table>
                }
            />}
        </body>
    );
}
export default Findflights;
