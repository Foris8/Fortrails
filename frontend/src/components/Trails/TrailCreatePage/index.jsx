import React, { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { createTrail,deleteTrail,editTrail } from '../../../store/trail';
import NavigationBar from '../../Navigation';
import TrailShowPageItems from '../TrailShowPage/TrailIndexItems';
import TrailFormModal from './TrailFormModal';
import "./index.css";
import { fetchTrails } from '../../../store/trail';


const CreateTrailPage = () => {
    const dispatch = useDispatch();
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
    const userTrails = useSelector((state) => {
        const trailsArray = Object.values(state.trails);
        return trailsArray.filter((trail) => trail.owner.id === currentUser.id);
    });
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('create'); // 'create' or 'update'
    const [currentTrailId, setCurrentTrailId] = useState(null);

    

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
        dispatch(fetchTrails());
    }, [dispatch]);

    return (
        <>
            <NavigationBar />
            <div className='create-trail-page'>
                <h2>Create a New Trail</h2>
                <button onClick={() => openModal('create')}>Create New Trail</button>

                <h3>My Trails</h3>
                <div className='trail-item-container'>
                    <ul className='trail-item-list'>
                        {userTrails.map((trail) => (
                            <li key={trail.id}>
                                <TrailShowPageItems trail={trail} />
                                <button onClick={() => handleDelete(trail.id)}>Delete</button>
                                <button onClick={() => openModal('update', trail.id)}>Update</button>
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
