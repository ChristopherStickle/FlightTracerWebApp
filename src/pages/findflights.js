import React from 'react';
import MapContainer from "../components/MapContainer";
import SearchMenu from "../components/searchMenu";
import ResultsPopup from "../components/Results-Popup";
import "./table.css"

class Findflights extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showPopup: true
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
            <SearchMenu
                onSubmit={this.togglePopup}
            />
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
