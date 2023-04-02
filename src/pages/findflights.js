import React from 'react';
import MapContainer from "../components/MapContainer";
import SearchMenu from "../components/SearchMenu";
import ResultsPopup from "../components/Results-Popup";
import "./table.css"
import airportData from "./airports.json";

class Findflights extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showPopup: false
        }
    }

    togglePopup = () => {
        this.setState({showPopup: !(this.state.showPopup)})
        ;}

    resultTable = [
        {
            callsign: "AAL123",
            aircraft: "A320",
            icao24: "A12345",
            departure: "KATL",
            arrival: "KJFK",
            departureTime: "12:00",
            arrivalTime: "14:00"
        },
        {
            callsign: "AAL123",
            aircraft: "A320",
            icao24: "A12345",
            departure: "KATL",
            arrival: "KJFK",
            departureTime: "12:00",
            arrivalTime: "14:00"
        },
        {
            callsign: "AAL123",
            aircraft: "A320",
            icao24: "A12345",
            departure: "KATL",
            arrival: "KJFK",
            departureTime: "12:00",
            arrivalTime: "14:00"
        },
        {
            callsign: "AAL123",
            aircraft: "A320",
            icao24: "A12345",
            departure: "KATL",
            arrival: "KJFK",
            departureTime: "12:00",
            arrivalTime: "14:00"
        }
    ];

    render(){
        return(
            <body>
            <center id="search--title">Search Menu</center>
            {/* Build onSubmit in findFlights - Create states and pass props down in SearchMenu*/}
            <SearchMenu placeholder={"Enter an Airfield..."} data = {airportData}/> {/*onSubmit = togglepoppup*/}
            <MapContainer />
            { this.state.showPopup && <ResultsPopup
                handleClose={this.togglePopup}
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
                        {this.resultTable.map((flight) => (
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

}
export default Findflights;
