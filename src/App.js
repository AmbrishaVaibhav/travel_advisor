import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { getPlacesData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
        setBounds({
          ne: { lat: latitude + 0.05, lng: longitude + 0.05 },
          sw: { lat: latitude - 0.05, lng: longitude - 0.05 },
        });
      },
      (error) => {
        console.error('Error getting current position:', error);
      }
    );
  }, []);

  useEffect(() => {
    console.log(coordinates, bounds);
    getPlacesData()
      .then((data) => {
        console.log(data);
        setPlaces(data);
      })
      .catch((error) => {
        console.error('Error fetching places data:', error);
      });
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          {coordinates && (
            <Map
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default App;
