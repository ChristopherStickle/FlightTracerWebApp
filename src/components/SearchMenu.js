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

    const [filteredTopAirports, setFilteredTopAirports] = useState();
    const [filteredBottomAirports, setFilteredBottomAirports] = useState();
    const handleFilterTop = (event) => {
        const searchWord = event.target.value;
        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase()) ||
                value.ident.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setFilteredTopAirports([]);
        } else {
            setFilteredTopAirports(newFilter);
        }
    }
    const handleFilterBottom = (event) => {
        const searchWord = event.target.value;
        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase()) ||
                value.ident.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setFilteredBottomAirports([]);
        } else {
            setFilteredBottomAirports(newFilter);
        }
    }
    // click on the airport name to select it
    const handleSelectTop = (value) => {
        setFilteredTopAirports([]);
        setState({
            ...state,
            ftopFairfield: value.name
        })
    }
    const handleSelectBottom = (value) => {
        setFilteredBottomAirports([]);
        setState({
            ...state,
            fbottomFairfield: value.name
        })
    }

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
                    fbottomArrival: "",
                    fbottomFairfield: "",
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
                        onKeyUp={handleFilterTop}
                        value={state.ftopFairfield}
                    />
                    {filteredTopAirports && ( // if filteredAirports is not null
                        <div className="dataResultTop">
                            {filteredTopAirports.slice(0, 5).map((value, key) => {
                                return (
                                    <div
                                        className="dataItem"
                                        onClick={() => handleSelectTop(value)}
                                        key={key}
                                    >
                                        {value.name}
                                    </div>
                                );
                            })}
                        </div>)
                    }
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
                        onKeyUp={handleFilterBottom}
                        value={state.fbottomFairfield}
                    />
                    {filteredBottomAirports && ( // if filteredAirports is not null
                        <div className="dataResultBottom">
                            {filteredBottomAirports.slice(0, 5).map((value, key) => {
                                return (
                                    <div
                                        className="dataItem"
                                        onClick={() => handleSelectBottom(value)}
                                        key={key}
                                    >
                                        {value.name}
                                    </div>
                                );
                            })}
                        </div>)
                    }
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