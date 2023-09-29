import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

function StarRating({ rating }) {
    const starIcons = [];

    // Calculate the number of full stars
    const fullStars = Math.floor(rating);

    // Check if there's a half star
    const hasHalfStar = rating % 1 !== 0;

    // Fill in full stars
    for (let i = 1; i <= fullStars; i++) {
        starIcons.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: "#59e871" }} />);
    }

    // Add a half star if necessary
    if (hasHalfStar) {
        starIcons.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} style={{ color: "#59e871" }} />);
    }

    // Fill in remaining stars as outline
    for (let i = starIcons.length + 1; i <= 5; i++) {
        starIcons.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: "#ccc" }} />);
    }

    return (
        <div className="star-rating">
            {starIcons.map((icon, index) => (
                <span key={index}>{icon}</span>
            ))}
        </div>
    );
}

export default StarRating;
