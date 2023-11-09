import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "./ReviewButton.css";
import { createReview,editReview } from '../../../store/review';

export default function ReviewButton({trail, hasReviewed, reviewId}) {
    const [modal, setModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const [rating, setRating] = useState(5);
    const [body, setBody] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    const toggleModal = () => {
        if (!sessionUser){
            history.push('/login')
        }
        else{
            setModal(!modal);
            setRating(5);
            setBody("")
        }
        
    };

    const onRatingChange = (e) => {
        const newRating = parseInt(e.target.value); // Parse the input value to an integer
        setRating(newRating); // Update the rating state with the new value
    };

    const onBodyChange = (e) => {
        const newBody = (e.target.value); 
        setBody(newBody); 
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const reviewData = {
            trailId: trail.id,
            rating,
            body,
            authorId: sessionUser.id
        };

        if (hasReviewed) {
            debugger
            dispatch(editReview(reviewId, reviewData));
        } else {
            dispatch(createReview(reviewData));
        }
        setModal(!modal);
    };


    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
            {hasReviewed ? (
                <button onClick={toggleModal} className="btn-modal">
                    Update Review
                </button>
            ) : (
                <button onClick={toggleModal} className="btn-modal">
                    Write Review
                </button>
            )}

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <div className="review-form">
                            <form className="form" onSubmit={handleSubmit}>
                                <h1>
                                    {trail.trailName}
                                </h1>
                                <span>
                                    Rating
                                </span>
                                <input
                                    label="Rating"
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={rating}
                                    onChange={onRatingChange}
                                    required
                                />
                                <span>Review</span>
                                <textarea
                                    label="Comment"
                                    value={body}
                                    onChange={onBodyChange}
                                    required
                                />

                                <button className="button" type="submit">Submit Review</button>
                            </form>

                        </div>

                        <button className="close-modal" onClick={toggleModal}>
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}