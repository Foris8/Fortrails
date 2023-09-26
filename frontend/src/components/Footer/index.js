import "./index.css"
import logo from "./logo.png"


const Footer = () =>{
    return (
     
        <div className="footer-container">
            <div className="">
                <img src={logo}></img>

                <div className="tag-container">
                    
                    <div class="footer-links">
                        <ul>
                            <li><a href="#">Explore</a></li>
                            <li><a href="#">Contries</a></li>
                            <li><a href="#">Regions</a></li>
                            <li><a href="#">Citites</a></li>
                            <li><a href="#">Parks</a></li>
                            <li><a href="#">Trails</a></li>
                        </ul>
                    </div>

                    <div class="footer-links">
                        <ul>
                            <li><a href="#">Maps</a></li>
                            <li><a href="#">My maps</a></li>
                            <li><a href="#">Create Map</a></li>
                        </ul>
                    </div>

                    <div class="footer-links">
                        <ul>
                            <li><a href="#">Company</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>

                    <div class="footer-social">
                        <ul>
                            <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                            <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                            <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>

    )
}

export default Footer;