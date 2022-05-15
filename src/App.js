import React, {useState, useEffect} from 'react';
import { CssBaseline, Grid} from '@material-ui/core';

import { getPlacesData, getWeatherData } from './api/index.js';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
    const[places, setPlaces] = useState([]);
    const[weatherData, setWeatherData] = useState([]);
    const[coordinates, setCoordinates] = useState({});
    const[bounds, setBounds] = useState({});
    const[childClicked, setChildClicked] = useState(null);
    const[isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const[filteredPlaces, setFilteredPlaces] = useState([]);
    const[weatherOnly, setWeatherOnly] = useState(false);
    

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude});
        });
    }, []);

    useEffect(() => {
        const filtered = places.filter((place) => Number(place.rating)===4.5? Number(place.rating) >= rating : Number(place.rating) > rating)

        setFilteredPlaces(filtered);
    }, [rating]);

    useEffect(() => {
        if(bounds.sw && bounds.ne){
            setIsLoading(true);

            getWeatherData(coordinates.lat, coordinates.lng)
                .then((data) => setWeatherData(data));

            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                    setFilteredPlaces([]);
                    setRating('');
                    setIsLoading(false);
                    setWeatherOnly(false);
                });
        }
    }, [type, bounds]);

    console.log(weatherData);

    return (
        <>
            <CssBaseline/>
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                        places = {filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                        setWeatherOnly={setWeatherOnly}
                        weatherOnly={weatherOnly}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                        weatherOnly={weatherOnly}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App;