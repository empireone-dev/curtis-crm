import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';


const containerStyle = {
    width: '80vw',
    height: '100vh'
};

const center = {
    lat: 49.352127,
    lng: -105.697569
};
const API_KEY = "AIzaSyAOQ594Xl5lKwyF1SpTcfFjsG3UYo2s_Iw";

function GoogleMapComponent({ ascs }) {
    const [loading, setLoading] = useState(true)
    const [pins, setPins] = useState([])

    useEffect(() => {

        async function loadData(params) {
            const data = ascs.map((res, i) => ({
                id: res.id,
                lng: parseFloat(res.longitude),
                lat: parseFloat(res.latitude),
            }))
            await setPins(data)
        }
        loadData()
        setLoading(false)
    }, []);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY
    });



    async function searchCoordinates(address, city, state, zip) {
        const fullAddress = `${address}, ${city}, ${state} ${zip}`;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway+Mountain+View+CA+94043&key=${API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log('response',data)

            if (data.results.length > 0) {
                const location = data.results[0].geometry.location;
                return { latitude: location.lat, longitude: location.lng };
            } else {
                throw new Error("No results found for the given address.");
            }
        } catch (error) {
            console.error("Error searching coordinates:", error);
            return null;
        }
    }

    useEffect(() => {
        const address = "3410- 9th ST SE"; // Example address
        const city = "Calgary"; // Example city
        const state = "AB"; // Example state
        const zip = "T2G 3C3"; // Example zip code

        // Call the searchCoordinates function
        async function fetchData() {
            const coordinates = await searchCoordinates(address, city, state, zip);
            console.log("Coordinates:", coordinates);
        }

        fetchData();
    }, []);
    return isLoaded && !loading ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={6}
        >
            <Marker
                position={{ lat: center.lat, lng: center.lng }}
                icon={{
                    scaledSize: new window.google.maps.Size(40, 40) // Adjust the size as needed
                }}
            />
            {pins.map(res => (
                <>

                    <InfoWindow
                        key={res.id}
                        position={{ lat: res.lat, lng: res.lng }}
                        options={{ maxWidth: 200 }}
                    >
                        <div>
                            <p>This is the center of the map.</p>
                        </div>
                    </InfoWindow>
                </>
            ))}

        </GoogleMap>
    ) : <></>;
}

export default GoogleMapComponent;
