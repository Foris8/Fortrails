import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { createTrail,deleteTrail,editTrail } from '../../../store/trail';
import NavigationBar from '../../Navigation';


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
    const [trailId, setTrailId] = useState(null);
    const userTrails = useSelector((state) => state.trails); 

    const handleDelete = () => {
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

    const handleSubmit = (e) => {
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
        dispatch(createTrail(trailData));
    };

    return (
        <>
            <NavigationBar />
            <div className='create-trail-page'>
                <h2>Create a New Trail</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Trail Name:</label>
                        <input
                            type="text"
                            value={trailName}
                            onChange={(e) => setTrailName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Park Name:</label>
                        <input
                            type="text"
                            value={parkName}
                            onChange={(e) => setParkName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Park Latitude:</label>
                        <input
                            type="number"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Park Longitude:</label>
                        <input
                            type="number"
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Start Latitude:</label>
                        <input
                            type="number"
                            value={startLat}
                            onChange={(e) => setStartLat(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Start Longitude:</label>
                        <input
                            type="number"
                            value={startLng}
                            onChange={(e) => setStartLng(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>End Latitude:</label>
                        <input
                            type="number"
                            value={endLat}
                            onChange={(e) => setEndLat(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>End Longitude:</label>
                        <input
                            type="number"
                            value={endLng}
                            onChange={(e) => setEndLng(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Difficulty:</label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            required
                        >
                            <option value="Easy">Easy</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                    <button type="submit">Create Trail</button>
                    <button type="button" onClick={() => handleUpdate(trailId)}>Update Trail</button>
                    <button type="button" onClick={() => handleDelete(trailId)}>Delete Trail</button>

                </form>

                <h3>My Trails</h3>
                {/* <ul>
                    {userTrails.map((trail) => (
                        <li key={trail.id}>
                            {trail.trail_name}
                            <button onClick={() => handleDelete(trail.id)}>Delete</button>
                            <button onClick={() => handleUpdate(trail.id)}>Update</button>
                        </li>
                    ))}
                </ul> */}
            </div>
        </>
    );
};

export default CreateTrailPage;
