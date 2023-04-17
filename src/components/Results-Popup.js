import React from "react";
import "./Results-Popup.css";
/*
* This is the popup that will display the results of the search.
* It will list the Flights delivered from the database.
* Displaying this popup will be triggered by the search button on the search menu.
*  components:
*      - a close button that will close the popup
*      - a load button that will load the flights into the map
*      - a list of flights that will be displayed in a table
*      - a checkbox next to each flight that will allow the user to select the flight to load
*/
const ResultsPopup = props => {
    return (
        <div className="ResultsPopup">
            <div className="box">
                <button className="btn-close" onClick={props.handleClose}>X</button>
                <button className="btn-load" onClick={props.handleLoad}>Load</button>
                {props.content}
            </div>
        </div>
    );
}
export default ResultsPopup;