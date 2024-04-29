import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoogleMap = () => {
    const [markers, setMarkers] = useState([]);
    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState('');

    useEffect(() => {
        axios.get('/user')
            .then(res => {
                setUserData(res.data);
            })
            .catch(err => {});

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setMarkers([{ lat, lng }]);
            });
        }

        axios.post("/get_all_users")
            .then(res => {
                setMarkers(res.data.status);
                setUserId(res.data.id);
            })
            .catch(err => {});

    }, []);


    const visit = (branch_name, id) => {
    
    };

    return (
        <div>
            {/* Your map component goes here */}
            {/* Assuming you will render your markers based on the `markers` state */}
            {markers.map((m, index) => (
                <div key={index}>
                    <a onClick={() => visit(m.store_name, m.id)}>
                        {userId === undefined ? m.store_name : null}
                    </a>
                    <div>{userId !== undefined ? m.store_name : null}</div>
                </div>
            ))}
        </div>
    );
};

export default GoogleMap;
