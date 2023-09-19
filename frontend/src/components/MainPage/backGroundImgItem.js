import React, { useState, useEffect } from 'react';
import './backGroundImgItem.css';

const BackgroundImageChanger = ()=>{
    const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);
    const backgroundImgUrls =[
        "https://cdn-assets.alltrails.com/assets/hero-images/hero-logged-out-1-w2800-3273b30ad24b7e72011c221851434af31b827f5cf75dd5ad13ff088749ee5355.jpg",
        "https://cdn-assets.alltrails.com/assets/hero-images/hero-logged-out-2-w2800-3ab7f14930eecbde4580b70f3fbdf855bc5cf8dc567d25f8c34d564798c8196d.jpg",
        "https://cdn-assets.alltrails.com/assets/hero-images/hero-logged-out-3-w2800-331a53e0d8a7db7ef047733917fb264a703398dead15dcc33136db1e8876c231.jpg",
        "https://cdn-assets.alltrails.com/assets/hero-images/hero-logged-out-4-w2800-7232acbbc3145d13071c1528a802880c44618365f3926fb0eb361532613dadf3.jpg"
    ]   


    useEffect(() => {
        const interval = setInterval(() => {
            // Increment the index to switch to the next background image
            setBackgroundImageIndex((prevIndex) =>
                prevIndex === backgroundImgUrls.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change the background image every 1000ms (1 second)

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, [backgroundImgUrls]);

    return(
        <div>
            <picture className="MainPage-module-picture">
                <img src={backgroundImgUrls[backgroundImageIndex]} alt="Background" className="MainPageBackGroundImg"></img>
            </picture>
        </div>
    )
    
}


export default BackgroundImageChanger;
