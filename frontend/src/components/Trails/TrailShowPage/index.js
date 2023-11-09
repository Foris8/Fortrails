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
import ReviewButton from './ReviewButton';
import StarRating from './starRating';
import TrailShowPageList from './TrailIndex';
import SingleTrailMap from '../../GoogleMap/singleTrail';
import { getUserReviewForTrail } from '../../../store/review';

const TrailShowPage = () =>{
    const dispatch = useDispatch()
    const {trailId} = useParams();
    

    const sessionUser = useSelector(state => state.session.user);
    const trail = useSelector(state => state.trails[trailId]);
    const reviews = useSelector(getTrailReviews(parseInt(trailId))); 
    const reviewId = useSelector(state => getUserReviewForTrail(state, sessionUser.id, trail.id)); // get the reviewID if exits


    useEffect(() => {
        dispatch(fetchTrail(trailId));
    }, [trailId, dispatch]);

    

    

    if (!trail){
        return null;
    }

    const { trailName, description, lat, lng, photoUrl, difficulty, averageRating, totalNumRating, parkName } = trail;
    const hasReviewed = sessionUser && reviews.some(review => review.authorId === sessionUser.id);

    return(
        <>
            <NavigationBar id="nav-bar"/>

            <div className='main-content-box'>

                <div className='main-content-container'>
                    <img src={photoUrl} className='trail-img'/>
                    
                    <div className='trail-title'>
                        <div>
                            <span style={{ fontSize: '30px' } }>
                                {trailName}
                               
                            </span>
    
                        </div>
                        <div>
                            <span style={{ fontSize: '15px' } }>
                                {parkName}
                               
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
                            <p>Description:</p>
                            <p title='trail-description'>{trail.description}</p>
                            
                            <div className="rating-and-button-container">
                                <div className="rating-container">
                                    <p className="average-rating">{averageRating}</p>
                                    <StarRating rating={averageRating}></StarRating>
                                    <p className="total-reviews">{totalNumRating} reviews</p>
                                </div>

                                <div className="button-container">
                                    <ReviewButton trail={trail} hasReviewed={hasReviewed} reviewId={reviewId} className="beautiful-button" />
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
                                                <>
                                            
                                                    <button
                                                        onClick={() => dispatch(destroyReview(review.id))}
                                                        className='delete-icon'
                                                    >
                                                        Delete
                                                        <i className="fa-solid fa-rectangle-xmark" />
                                                    </button>
                                                </>
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




export default TrailShowPage;