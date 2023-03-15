import React from 'react';

/*
    *  This will be a search menu that will display above the MapContainer on the findflights page.
    * It will have an airfield dropdown menu, a date picker, a time picker, a search button, and a clear button.
    * The airfield dropdown menu will be populated by the airfields from the database.
    * under the airfield dropdown will be 3 choice chips: "Departures", "Arrivals", and "Both".
    * The date picker will be a calendar that will allow the user to select a date.
    * the time picker will be a dropdown menu that will allow the user to select a time at hour increments.
    * The search button will search the database for flights that match the search criteria.
    * The clear button will clear the search criteria.
    */

export default function SearchMenu() {
return (
        <div className="search--menu">
            <div id="search--title">Search Menu</div>
            <form>
                <input type="text" id="fairfield" placeholder='Airfield Name'/>
                <input type="date" id="fdate"/>
                <label for="flight-times" ></label>
                <select name="flight-times" id="fight-times">
                    <option value="none">Select a time</option>
                    <option value="00:00:00">00:00:00</option>
                    <option value="01:00:00">01:00:00</option>
                    <option value="02:00:00">02:00:00</option>
                    <option value="03:00:00">03:00:00</option>
                    <option value="04:00:00">04:00:00</option>
                    <option value="05:00:00">05:00:00</option>
                    <option value="06:00:00">06:00:00</option>
                    <option value="07:00:00">07:00:00</option>
                    <option value="08:00:00">08:00:00</option>
                    <option value="09:00:00">09:00:00</option>
                    <option value="10:00:00">10:00:00</option>
                    <option value="11:00:00">11:00:00</option>
                    <option value="12:00:00">12:00:00</option>
                    <option value="13:00:00">13:00:00</option>
                    <option value="14:00:00">14:00:00</option>
                    <option value="15:00:00">15:00:00</option>
                    <option value="16:00:00">16:00:00</option>
                    <option value="17:00:00">17:00:00</option>
                    <option value="18:00:00">18:00:00</option>
                    <option value="19:00:00">19:00:00</option>
                    <option value="20:00:00">20:00:00</option>
                    <option value="21:00:00">21:00:00</option>
                    <option value="22:00:00">22:00:00</option>
                    <option value="23:00:00">23:00:00</option>
                </select>
                <input type="submit" id="searchmenu-submit"></input>
                <button type="reset">Clear</button>
            </form>
        </div>
    );
}