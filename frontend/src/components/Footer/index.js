import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub,faUser } from '@fortawesome/free-brands-svg-icons';
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
                    {/* <div className="footer-section">
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
                    </div> */}
                    <div className="footer-section">
                        <h3>Portfolio</h3>
                        <ul>
                            <li><a href="https://fanyitang.io/" target="_blank" rel="noopener noreferrer">About Me</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-social">
                    <h3>Follow</h3>
                    <ul>
                        <li><a href="https://www.linkedin.com/in/fanyitang/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                        <li><a href="https://github.com/Foris8" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
