import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchTrail } from '../../../store/trail';
import { getTrailReviews,destroyReview} from '../../../store/review';
import { fetchReviews } from '../../../store/review';
import NavigationBar from '../../Navigation';
import "./index.css"
import TrailIndexPage from '../TrailIndexPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import ReviewForm from './ReviewForm';
import ReviewButton from './ReviewButton';
import StarRating from './starRating';
import TrailShowPageList from './TrailIndex';
import SingleTrailMap from '../../GoogleMap/singleTrail';

const TrailShowPage = () =>{
    const dispatch = useDispatch()
    const {trailId} = useParams();
    

    const sessionUser = useSelector(state => state.session.user);
    const trail = useSelector(state => state.trails[trailId]);
    const reviews = useSelector(getTrailReviews(parseInt(trailId))); 
    useEffect(() => {
        dispatch(fetchTrail(trailId));
    }, [trailId, dispatch]);

    

    

    if (!trail){
        return null;
    }

    const { trailName, description, lat, lng, photoUrl, difficulty, averageRating, totalNumRating } = trail;
    const hasReviewed = sessionUser && reviews.some(review => review.authorId === sessionUser.id);

    return(
        <>
            <NavigationBar id="nav-bar"/>

            <div className='main-content-box'>

                <div className='main-content-container'>
                    <img src="https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTA2MDY1NDUvMGJmMTA0MDZjZDYwOGI0YWE2NGI5ZTBiMmU3ODRmMzAuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoyMDQ0LCJoZWlnaHQiOjYyNCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0=" alt="Long Path and Shore Loop, Palisades Interstate Park, Alpine, New Jersey, United States | AllTrails.com" className='trail-img'/>
                    
                    <div className='trail-title'>
                        <div>
                            <span style={{ fontSize: '30px' } }>
                                {trailName}
                            </span>
                        </div>

                        <div className='trail-title-rating'>
                            <span>{difficulty} </span>
                            <span>• </span>
                            <span>
                                <FontAwesomeIcon icon={faStar} style={{ color: "#59e871", }} />
                            </span>

                            <span> {averageRating} </span>
                            <span>({totalNumRating})</span>
                        </div>
                        
                    </div>
                    
                    <div className='bottom-container'>

                        <div className='left-trail-content'>
                            <p title='trail-description'>{trail.description}</p>
                            
                            <div className="rating-and-button-container">
                                <div className="rating-container">
                                    <p className="average-rating">{averageRating}</p>
                                    <StarRating rating={averageRating}></StarRating>
                                    <p className="total-reviews">{totalNumRating} reviews</p>
                                </div>

                                <div className="button-container">
                                    <ReviewButton trail={trail} className="beautiful-button" />
                                </div>
                            </div>
                           
                            <div className="reviews">
                                {reviews.map(review => (
                                    <div className="review" key={review.id}>
                                        <div className='user-content'>
                                            <img src="https://cdn-assets.alltrails.com/assets/placeholder/profile/bird.jpg" className='user-icon'></img>
                                            <p className='user-name'>{review.firstName} {review.lastName}</p>
                                            <p className='review-date'>{review.createdAt}</p>
                                        </div>
                                        <div className='star-rating'>
                                            <StarRating rating={review.rating}></StarRating>
                                        </div>
                                        <p className='review-text'>{review.body}</p>
                                        {review.authorId === sessionUser?.id && (
                                            <button
                                                onClick={() => dispatch(destroyReview(review.id))}
                                                className='delete-icon'
                                            >
                                                Delete
                                                <i className="fa-solid fa-rectangle-xmark" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                        </div>

                        <div className='right-trail-content'>
                            <div className='goolge-show-map'>
                                <SingleTrailMap trail={trail}></SingleTrailMap>
                            </div>
                            
                            <TrailShowPageList></TrailShowPageList>
                        </div>
                        
                    </div>
                    
                    
                </div>


                
                
            </div>
        </>
    )
}


function LeaveReview({ trail }){
    const [showReviewForm, setShowReviewForm] = useState(false);

    return showReviewForm? (
       <ReviewForm
        trail={trail}
        closeForm={() => setShowReviewForm(false)}/>
       
    ):(
        <button className='review-button' onClick={()=> setShowReviewForm(true)}>
            Write a Review
        </button>
    )
}

export default TrailShowPage;