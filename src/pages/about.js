import React from 'react';
import "./pages.css"

const About = () => {
    return (
        <body>
            <h3>Background</h3>
            <p>
                At any given moment, there are hundreds, if not thousands of airplanes in the sky above us. These airplanes communicate with one another and with ground-based air traffic control centers using a technology called Automatic dependent surveillance—broadcast (ADS–B). ADS-B is a public signal that can be intercepted by hobbyists and enthusiasts and allow the systematic tracking of air traffic.
                <br/><br/>
                While several air traffic tracking providers exist, access to their data is proprietary and typically only allows for limited overview of historic flight data. Moreover, flight data is incomplete, e.g., only part of the trip of any given flight may be available.
            </p>
            <h3>Objective</h3>
            <p>
                The objective of this project is to design and implement a tool, which parses the proprietary access to the flight tracking providers listed below in order to reconstruct and visualize the complete trip of some subset of flights. In contrast to the flight tracking providers themselves, not a live traffic of planes shall be visualized, but “historic” flights, i.e., flights which have been completed and are gap-free.
            </p>
            <h3>Who made it?</h3>
            <p>
                <li>Keith Allen</li>
                <li>David Hennigan</li>
                <li>Christopher Stickle</li>
                <li>Adil Tiba</li>
                <li>Emir Akpinar</li>
            </p>
            <h3>Licensing Agreements/Products Used</h3>
            <p>Coming soon...</p>
        </body>
    );
};

export default About;
