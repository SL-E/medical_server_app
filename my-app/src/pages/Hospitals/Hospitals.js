import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { getHospitalList } from '../../api';

const center = { lat: -42.9909679, lng: 170.8223845 };

function Map() {
  const [map, setMap] = useState(null);
  const [randCoords, setCoords] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getHospitalList();
      setCoords(res.data.hospitals || [])
    })()
  }, [])

  const onMapLoad = (mapObj) => {
    setMap(mapObj);
  };

  const handleMarkerClick = (location) => {
    if (map) {
      const lat = location.latLng.lat()
      const lng = location.latLng.lng()
      map.panTo({ lat, lng });
      map.setZoom(12);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', marginTop: '50px', borderRadius: '10px', overflow: 'hidden' }}>
      <LoadScript googleMapsApiKey="AIzaSyCcaLC8TYbbAdIjpw_JWVhJOIuVu3O42cg">
        <GoogleMap mapContainerStyle={{ height: '70vh', width: '70vw' }} center={center} zoom={6} onLoad={onMapLoad}>
          {randCoords.length > 0 ? (randCoords.map((coord, i) => {
            const { lat, lng } = coord; 
            return (
              <Marker 
                key={i}
                position={{ lat: Number(lat), lng: Number(lng) }} 
                label={{
                    text: coord.name,
                    fontSize: "14px",
                    color: "white",
                    padding: "6px",
                }}
                onClick={(location) => handleMarkerClick(location)} 
              />
            )
          })) : null}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map;
