import React,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function ReviewForm({ bench, closeForm }) {
    const sessionUser = useSelector(state => state.session.user);
    const [rating, onRatingChange] = useState(5);
    const [body, onBodyChange] = useState("");
    const history = useHistory();

    const redirectToLogIn = () => {
        history.push('/login'); // Replace '/some-page' with the route you want to navigate to.
    };

    useEffect(() => {
        if (!sessionUser) {
            redirectToLogIn();
        }
    }, [sessionUser]);

    return (
        <>
            {sessionUser ? (
                <div className="review-form">
                    <form  className="form">
                        <input
                            label="Rating"
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={onRatingChange}
                            required
                        />

                        <textarea
                            label="Comment"
                            value={body}
                            onChange={onBodyChange}
                            required
                        />

                        <div className="review-form-buttons">
                            <button onClick={closeForm} className="button" type="button">Cancel</button>
                            <button className="button" type="submit">Submit Review</button>
                        </div>
                    </form>
                </div>
            ) : (null)}
            
        </>
    );
}

export default ReviewForm;