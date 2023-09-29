import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import logo from "./logo.png"
import './index.css'; // Import your CSS file for styling

function Footer() {
    return (
        <footer className="alltrails-footer">
            <div className="container">
                <div className="footer-logo">
                    {/* Add your logo image here */}
                    <img src={logo} alt="Logo" />
                </div>
                <div className="footer-links">
                    <div className="footer-section">
                        <h3>Explore</h3>
                        <ul>
                            <li><a href="#">Countries</a></li>
                            <li><a href="#">Regions</a></li>
                            <li><a href="#">Cities</a></li>
                            <li><a href="#">Parks</a></li>
                            <li><a href="#">Trails</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Maps</h3>
                        <ul>
                            <li><a href="#">My Maps</a></li>
                            <li><a href="#">Create Map</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Company</h3>
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-social">
                    <h3>Follow</h3>
                    <ul>
                        <li><a href="#"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faGithub} /></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
