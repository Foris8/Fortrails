import React, { useState, useEffect } from 'react';
import { fetchTrails } from '../../../store/trail';
import { useDispatch,useSelector } from 'react-redux';


const TrailFormModal = ({ show, onClose, onSubmit, trailData }) => {
  // State for form fields, initialized with trailData if available, otherwise empty
  const [trailName, setTrailName] = useState('');
  const [description, setDescription] = useState('');
  const [parkName, setParkName] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [startLat, setStartLat] = useState('');
  const [startLng, setStartLng] = useState('');
  const [endLat, setEndLat] = useState('');
  const [endLng, setEndLng] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [picture, setPicture] = useState(null);
  const dispatch = useDispatch();

  // Effect to pre-populate form when trailData is provided (for update)
  useEffect(() => {
    if (trailData) {
      setTrailName(trailData.trailName);
      setDescription(trailData.description);
      setParkName(trailData.parkName);
      setLat(trailData.lat);
      setLng(trailData.lng);
      setStartLat(trailData.startLat);
      setStartLng(trailData.startLng);
      setEndLat(trailData.endLat);
      setEndLng(trailData.endLng);
      setDifficulty(trailData.difficulty);
      // setPicture(trailData.picture); // Assuming you have a way to handle pictures
    }
  }, [trailData]);

  const handleSubmit =  async (e) => {
    e.preventDefault();
    const formData = {
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
      picture,
    };
    await onSubmit(formData);
    dispatch(fetchTrails())
  };

  // If the modal is not shown, don't render anything
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-trail">
        <div className="modal-header">
          <h5 className="modal-title">{trailData ? 'Update Trail' : 'Create Trail'}</h5>
          <button type="button" className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Trail Name:</label>
              <input
                type="text"
                className="form-control"
                value={trailName}
                onChange={(e) => setTrailName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Description:</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Park Name:</label>
              <input
                type="text"
                className="form-control"
                value={parkName}
                onChange={(e) => setParkName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Park Latitude:</label>
              <input
                type="number"
                className="form-control"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Park Longitude:</label>
              <input
                type="number"
                className="form-control"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Start Latitude:</label>
              <input
                type="number"
                className="form-control"
                value={startLat}
                onChange={(e) => setStartLat(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Start Longitude:</label>
              <input
                type="number"
                className="form-control"
                value={startLng}
                onChange={(e) => setStartLng(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>End Latitude:</label>
              <input
                type="number"
                className="form-control"
                value={endLat}
                onChange={(e) => setEndLat(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>End Longitude:</label>
              <input
                type="number"
                className="form-control"
                value={endLng}
                onChange={(e) => setEndLng(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Difficulty:</label>
              <select
                className="form-control"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                required
              >
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* If you have a way to handle pictures, include the input here */}
            {/* <div className="form-group">
              <label>Trail Picture:</label>
              <input
                type="file"
                className="form-control"
                onChange={handlePictureChange}
              />
            </div> */}

            <div className="form-group">
              <button type="submit" className="submit-button">
                {trailData ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrailFormModal;
