import React, { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { createTrail,deleteTrail,editTrail } from '../../../store/trail';
import NavigationBar from '../../Navigation';
import TrailShowPageItems from '../TrailShowPage/TrailIndexItems';
import TrailFormModal from './TrailFormModal';
import "./index.css";
import { fetchTrails } from '../../../store/trail';
import AllTrailIndexItems from '../TrailIndexPage/AllTrailsIndex';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const CreateTrailPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [trailName, setTrailName] = useState('');
    const [description, setDescription] = useState('');
    const [parkName, setParkName] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [startLat, setStartLat] = useState('');
    const [startLng, setStartLng] = useState('');
    const [endLat, setEndLat] = useState('');
    const [endLng, setEndLng] = useState('');
    const [difficulty, setDifficulty] = useState("Easy");
    const [picture, setPicture] = useState(null);
    const currentUser = useSelector((state) => state.session.user);
    
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('create'); // 'create' or 'update'
    const [currentTrailId, setCurrentTrailId] = useState(null);
    const sessionUser = useSelector(state => state.session.user);
    const userTrails = useSelector((state) => {
        const trailsArray = Object.values(state.trails);
        return trailsArray.filter((trail) => trail.owner && currentUser && trail.owner.id === currentUser.id);
    });

    

    const openModal = (type, trailId = null) => {
        setModalType(type);
        setCurrentTrailId(trailId); // Will be null for 'create'
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentTrailId(null); // Reset current trail ID when closing modal
    };

    const handleModalSubmit = async (trailData) => {
        if (modalType === 'create') {
            await dispatch(createTrail(trailData));
            dispatch(fetchTrails());
        } else if (modalType === 'update') {
            await dispatch(editTrail(currentTrailId, trailData));
            dispatch(fetchTrails());
        }
        closeModal();
    };

    const handleDelete = async (trailId) => {
        if (trailId) {
            dispatch(deleteTrail(trailId));
            
        }
    };

     const handleUpdate = (trailId) => {
        const trailData = {
            trail_name: trailName,
            description,
            park_name: parkName,
            lat,
            lng,
            start_lat: startLat,
            start_lng: startLng,
            end_lat: endLat,
            end_lng: endLng,
            difficulty,
            picture
        };
        dispatch(editTrail(trailId, trailData));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const trailData = {
            trail_name: trailName,
            description,
            park_name: parkName,
            lat,
            lng,
            start_lat: startLat,
            start_lng: startLng,
            end_lat: endLat,
            end_lng: endLng,
            difficulty,
            picture
        };
        await dispatch(createTrail(trailData));
        dispatch(fetchTrails());
    };

    useEffect(() => {
        if (!sessionUser) {
            history.push('/login');
        } else {
            dispatch(fetchTrails());
        }
    }, [dispatch, sessionUser, history]);


    

    return (
        <>
            <NavigationBar />
            <div className='create-trail-page'>
                <h1>Create a New Trail</h1>
                <button className='create-button' onClick={() => openModal('create')}>Create New Trail</button>

                <h1 className='create-my-trail'>My Trails List</h1>
                <div className='create-trail-item-container'>
                    <ul className='create-trail-item-list'>
                        {userTrails.map((trail) => (
                            <li key={trail.id} className="all-trail-index-item">
                                <AllTrailIndexItems trail={trail} />
                                <div>
                                    <button className='create-button' onClick={() => handleDelete(trail.id)}>Delete</button>
                                    <button className='create-button' onClick={() => openModal('update', trail.id)}>Update</button>
                                </div>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>

            {showModal && (
                <TrailFormModal
                    show={showModal}
                    onClose={closeModal}
                    onSubmit={handleModalSubmit}
                    trailData={modalType === 'update' ? userTrails.find(trail => trail.id === currentTrailId) : null}
                />
            )}
        </>
    );
};

export default CreateTrailPage;
