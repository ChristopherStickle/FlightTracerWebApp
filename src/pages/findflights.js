import React, {useState} from 'react';
import MapContainer from "../components/MapContainer";
import SearchMenu from "../components/SearchMenu";
import ResultsPopup from "../components/Results-Popup";
import "./table.css"
import airportData from "./airportsReduced.json";

function Findflights (){

    //-----------------------------------------------------------------------------------------------------------------
    // for the search menu |
    //----------------------
    const [formData, setFormData] = useState({});
    const handleFormSubmit = (formStates) => {
        // set the form data to the formStates
        setFormData(formStates);
        alert("Form Submitted" + JSON.stringify(formStates, null, 2));
        togglePopup();
    }
    //-----------------------------------------------------------------------------------------------------------------
    // for the popup |
    //----------------
    const [showPopup, setShowPopup] = React.useState(false);
    const togglePopup = () => {
        setShowPopup(!showPopup);
    }
    //-----------------------------------------------------------------------------------------------------------------
    const resultTable = [];

    return(
        <body>
            <center id="search--title">Search Menu</center>
            {/* Build onSubmit in findFlights - Create states and pass props down in SearchMenu*/}
            <SearchMenu placeholder={"Enter an Airfield..."} data = {airportData} onFormSubmit={handleFormSubmit} />
            <MapContainer />
            { showPopup && <ResultsPopup
                handleClose={togglePopup}
                content={
                    <table>
                        <tr>
                            <th>Selected</th>
                            <th>Call Sign</th>
                            <th>Aircraft</th>
                            <th>ICAO24</th>
                            <th>Departure</th>
                            <th>Arrival</th>
                            <th>Departure Time</th>
                            <th>Arrival Time</th>
                        </tr>
                        {resultTable.map((flight, index) => (
                            <tr>
                                <td><input type="checkbox" name="selected" value="selected"/></td>
                                <td>{flight.callsign}</td>
                                <td>{flight.aircraft}</td>
                                <td>{flight.icao24}</td>
                                <td>{flight.departure}</td>
                                <td>{flight.arrival}</td>
                                <td>{flight.departureTime}</td>
                                <td>{flight.arrivalTime}</td>
                            </tr>
                        ))}
                    </table>
                }
            />}
        </body>
    );
}
export default Findflights;
