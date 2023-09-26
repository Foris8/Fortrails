import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchTrail } from '../../../store/trail';
import { getTrailReviews,destroyReview} from '../../../store/review';
import { fetchReviews } from '../../../store/review';
import NavigationBar from '../../Navigation';
import "./index.css"
import TrailIndexPage from '../TrailIndexPage';

const TrailShowPage = () =>{
    const dispatch = useDispatch()
    const {trailId} = useParams();
    

    const sessionUser = useSelector(state => state.session.user);
    const trail = useSelector(state => state.trails[trailId]);
    console.log(trail)
    const reviews = useSelector(getTrailReviews(parseInt(trailId))); 
    
    useEffect(() => {
        dispatch(fetchTrail(trailId));
    }, [trailId, dispatch]);

    

    

    if (!trail){
        return null;
    }

    const { description, lat, lng, photoUrl } = trail;
    const hasReviewed = sessionUser && reviews.some(review => review.authorId === sessionUser.id);

    return(
        <>
            <NavigationBar id="nav-bar"/>

            <div className='main-content-box'>

                <div className='main-content-container'>
                    <img src="https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTA2MDY1NDUvMGJmMTA0MDZjZDYwOGI0YWE2NGI5ZTBiMmU3ODRmMzAuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoyMDQ0LCJoZWlnaHQiOjYyNCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0=" alt="Long Path and Shore Loop, Palisades Interstate Park, Alpine, New Jersey, United States | AllTrails.com" className='trail-img'/>
                    
                    <div className='trail-title'>
                        <h1>
                            {trail.trailName}
                        </h1>
                    </div>
                    
                    <div className='bottom-container'>

                        <div className='left-trail-content'>
                            <p>{trail.description}</p>
                            <div className="reviews">
                                {reviews.map(review => (
                                    <div className="review" key={review.id}>
                                        <h3>Rating: {review.rating}</h3>
                                        <span>{review.author}</span>
                                        <p>{review.body}</p>
                                        {review.authorId === sessionUser?.id && (
                                            <button
                                                onClick={() => dispatch(destroyReview(review.id))}
                                                className='delete-icon'
                                            >
                                                <i className="fa-solid fa-rectangle-xmark" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='right-trail-content'>
                            <TrailIndexPage/>
                        </div>
                        
                    </div>
                    
                    
                </div>


                
                
            </div>
        </>
    )
}

export default TrailShowPage;