import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';

const Map = ({ setCoordinates, setBounds, coordinates }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.mapContainer}>
      <MapContainer center={coordinates} zoom={14} style={{ height: '100%', width: '100%' }}>
        <ChangeView setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coordinates} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={coordinates}>
          <Popup>A popup for your location.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

Map.propTypes = {
  setCoordinates: PropTypes.func.isRequired,
  setBounds: PropTypes.func.isRequired,
  coordinates: PropTypes.object.isRequired,
};

const ChangeView = ({ setCoordinates, setBounds, coordinates }) => {
  const map = useMap();
  const [hasEffectRun, setHasEffectRun] = useState(false);

  React.useEffect(() => {
    if (!hasEffectRun) {
      map.setView(coordinates, 14);
      setHasEffectRun(true);
    }
  }, [map, coordinates, hasEffectRun]);

  map.on('moveend', () => {
    const center = map.getCenter();
    const bounds = map.getBounds(); // Use getBounds() instead of marginBounds

    
    setCoordinates({ lat: center.lat, lng: center.lng });
    setBounds({
      ne: { lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng },
      sw: { lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng },
    });
  });

  return null;
};

export default Map;
