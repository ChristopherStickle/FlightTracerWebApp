import React, {useState} from 'react';
import "./searchMenu.css";

   /*
    *  This will be a search menu that will display above the MapContainer on the findflights page.
    * It will have an airfield text field, a date picker, a time picker, a search button, and a clear button.
    * The airfield dropdown menu will be populated by the airfields from the JSON.
    * 3 choice chips: "Departures", "Arrivals", and "Both" will be next to each airfield text field.
    * The date picker will be a calendar that will allow the user to select a date.
    * the time picker will be a dropdown menu that will allow the user to select a time.
    * The search button will search the database for flights that match the search criteria.
    * The clear button will clear the search criteria.
    */

function SearchMenu({placeholder, data}){

    const [state, setState] = useState({
        ftopFairfield: '',
        ftopDeparture: "",
        ftopArrival: "",
        ftopBoth: "Both",
        ftopDate: '',
        ftopTime: '',
        fbottomFairfield: '',
        fbottomDeparture: "",
        fbottomArrival: ""
    });

    const handleClear = () => {
        setState({
            ftopFairfield: '',
            ftopDeparture: "",
            ftopArrival: "",
            ftopBoth: "Both",
            ftopDate: '',
            ftopTime: '',
            fbottomFairfield: '',
            fbottomDeparture: "",
            fbottomArrival: ""
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(state, null, 2));
    };

    const handleChange = (event) => {
        const { id, name, value } = event.target;

        switch (name) {
            case "ftopDeparture":
                setState({
                    ...state,
                    [id]: value,
                    ftopDeparture: "Departure",
                    ftopArrival: "",
                    fbottomDeparture: "",
                    fbottomArrival: "Arrival",
                    ftopBoth: ""
                });
                break;
            case "ftopArrival":
                setState({
                    ...state,
                    [id]: value,
                    ftopArrival: "Arrival",
                    ftopDeparture: "",
                    fbottomDeparture: "Departure",
                    fbottomArrival: "",
                    ftopBoth: ""
                });
                break;
            case "ftopBoth":
                setState({
                    ...state,
                    [id]: value,
                    ftopBoth: "Both",
                    ftopDeparture: "",
                    ftopArrival: "",
                    fbottomDeparture: "",
                    fbottomArrival: ""
                });
                break;
            case "fbottomDeparture":
                setState({
                    ...state,
                    [id]: value,
                    fbottomDeparture: "Departure",
                    fbottomArrival: "",
                    ftopDeparture: "",
                    ftopArrival: "Arrival",
                    ftopBoth: ""
                });
                break;
            case "fbottomArrival":
                setState({
                    ...state,
                    [id]: value,
                    fbottomArrival: "Arrival",
                    fbottomDeparture: "",
                    ftopDeparture: "Departure",
                    ftopArrival: "",
                    ftopBoth: ""
                });
                break;
            default:
                setState({ ...state, [id]: value });
        }
    };


    return(
        <div className="search--menu">
            <form style={{ display:"flex", flexDirection: "column" }}>
                <div id = "ftop" style={{display: "flex"}}>
                    <input
                        type="text"
                        id="ftopFairfield"
                        placeholder={placeholder}
                        onChange={handleChange}
                        value={state.ftopFairfield}
                    />
                    <div>
                        <input
                            type="radio"
                            name="ftopDeparture"
                            value="Departure"
                            onChange={handleChange}
                            checked={state.ftopDeparture === "Departure"}
                        />Departure
                        <input
                            type="radio"
                            name="ftopArrival"
                            value="Arrival"
                            onChange={handleChange}
                            checked={state.ftopArrival === "Arrival"}
                        />Arrival
                        <input
                            type="radio"
                            name="ftopBoth"
                            value="Both"
                            onChange={handleChange}
                            checked={state.ftopBoth === "Both"}
                        />Both
                    </div>
                    <input
                        type="date"
                        id="ftopDate"
                        name="date"
                        onChange={handleChange}
                        value={state.ftopDate}
                    />
                    <input
                        type="time"
                        id="ftopTime"
                        name="time"
                        onChange={handleChange}
                        value={state.ftopTime}
                    />
                </div>
                <div id="fbottom" style={{display: "flex"}}>
                    <input
                        type="text"
                        id="fbottomFairfield"
                        placeholder={placeholder}
                        onChange={handleChange}
                        value={state.fbottomFairfield}
                    />
                    <div>
                        <input
                            type="radio"
                            name="fbottomDeparture"
                            value="Departure"
                            onChange={handleChange}
                            checked={state.fbottomDeparture === "Departure"}
                        />Departure
                        <input
                            type="radio"
                            name="fbottomArrival"
                            value="Arrival"
                            onChange={handleChange}
                            checked={state.fbottomArrival === "Arrival"}
                        />Arrival
                    </div>
                </div>
            </form>
            <div id="btn-container">
                <input
                    id={"btn--search"}
                    type="submit"
                    value="Search"
                    onClick={handleSubmit}
                />
                <input
                    id={"btn--clear"}
                    type="reset"
                    value="Clear"
                    onClick={handleClear}
                />
            </div>
        </div>
    )
}
export default SearchMenu;

/***
 *  Previous code: uses class components -- incompatible with React Hooks
 *
 * class SearchMenu extends React.Component {
 *     constructor(props) {
 *         super(props);
 *         this.state = {
 *             airfield: '',
 *             destination: '',
 *             date: '',
 *             time: '',
 *         };
 *         this.handleSubmit = this.handleSubmit.bind(this);
 *         this.handleChanges = this.handleChanges.bind(this);
 *     }
 *     handleClear = () => {
 *         this.setState({
 *             airfield: '',
 *             destination: '',
 *             date: '',
 *             time: ''
 *         });
 *     }
 *     handleSubmit = (event) => {
 *         alert('Submitted: \n' +
 *             'Airfield: ' + this.state.airfield + '\n' +
 *             'Destination: ' + this.state.destination + '\n' +
 *             'Date: ' + this.state.date + '\n' +
 *             'Time: ' + this.state.time + '\n'
 *         );
 *         event.preventDefault();
 *         this.props.onSubmit();
 *     }
 *     handleChanges = (event) => {
 *         this.setState({
 *             [event.target.name]: event.target.value
 *         });
 *     }
 *
 *     render() {
 *         return (
 *             <div className="search--menu">
 *                 <form onSubmit={this.handleSubmit}>
 *                     <input type="text" id="fairfield" placeholder='Airfield Name' name="airfield" value={this.state.airfield} onChange={this.handleChanges} />
 *                     <div>
 *                         <input type="radio" id="destination-choice1" name="destination" value="Departures" onChange={this.handleChanges} />
 *                         <label for="destination-choice1">Departures</label>
 *                         <input type="radio" id="destination-choice2" name="destination" value="Arrivals" onChange={this.handleChanges} />
 *                         <label for="destination-choice2">Arrivals</label>
 *                         <input type="radio" id="destination-choice3" name="destination" value="Both" onChange={this.handleChanges} />
 *                         <label for="destination-choice3">Both</label>
 *                     </div>
 *                     <input type="date" id="fdate" name="date" value={this.state.date} onChange={this.handleChanges} />
 *                     <label for="flight-times" ></label>
 *                     <select name="time" id="fight-times" value={this.state.time} onChange={this.handleChanges}>
 *                         <option value="none">Select a time</option>
 *                         <option value="00:00:00">00:00:00</option>
 *                         <option value="01:00:00">01:00:00</option>
 *                         <option value="02:00:00">02:00:00</option>
 *                         <option value="03:00:00">03:00:00</option>
 *                         <option value="04:00:00">04:00:00</option>
 *                         <option value="05:00:00">05:00:00</option>
 *                         <option value="06:00:00">06:00:00</option>
 *                         <option value="07:00:00">07:00:00</option>
 *                         <option value="08:00:00">08:00:00</option>
 *                         <option value="09:00:00">09:00:00</option>
 *                         <option value="10:00:00">10:00:00</option>
 *                         <option value="11:00:00">11:00:00</option>
 *                         <option value="12:00:00">12:00:00</option>
 *                         <option value="13:00:00">13:00:00</option>
 *                         <option value="14:00:00">14:00:00</option>
 *                         <option value="15:00:00">15:00:00</option>
 *                         <option value="16:00:00">16:00:00</option>
 *                         <option value="17:00:00">17:00:00</option>
 *                         <option value="18:00:00">18:00:00</option>
 *                         <option value="19:00:00">19:00:00</option>
 *                         <option value="20:00:00">20:00:00</option>
 *                         <option value="21:00:00">21:00:00</option>
 *                         <option value="22:00:00">22:00:00</option>
 *                         <option value="23:00:00">23:00:00</option>
 *                     </select>
 *                     <input type="submit" id="searchmenu-submit"></input>
 *                     <button type="reset" onClick={this.handleClear}>Clear</button>
 *                 </form>
 *             </div>
 *         );
 *     }
 * }
 * export default SearchMenu;
***/