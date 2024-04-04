import React from "react";
import imageSrc from './Images/Charity-Image.png';
import "../CSS/carousel.css"
import '../CSS/nav-styles.css'
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import { useEffect } from "react";

function Carousel() {
    useEffect(() => {
        const textContainer = document.getElementById('hp-hero-content');
        setTimeout(() => {
            textContainer.classList.add('fade-in');
        }, 500); // Delay of 500ms before adding the fade-in class
    }, []);
    return (
        <>
            <div className="homepage-hero-section">
                <img src={imageSrc} alt="background" className="carousel" />
                <div id="hp-hero-content">
                    <h2 className="hp-hero-quote"><p>❝ We make a living by what we get, but we make a life</p>
                        <p>by what we give.❞</p></h2>
                    <p className="hp-hero-description">Be the change you wish to see in the world.</p>
                    <div id="hp-schedule-now-button-container">
                        <Link to="/PickupPage">
                            <button id="hp-schedule-now-button"><p>Book a Pickup</p>&nbsp;&nbsp;<FaArrowCircleRight /></button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Carousel;