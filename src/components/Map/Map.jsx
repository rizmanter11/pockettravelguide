import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';
import mapStyles from './mapStyles';

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData, weatherOnly}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng});
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw});
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                
                {!weatherOnly && places?.map((place, i) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large"/>
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : 'https://images.adsttc.com/media/images/5e4c/1025/6ee6/7e0b/9d00/0877/large_jpg/feature_-_Main_hall_1.jpg?1582043123'}
                                        alt={place.name}
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly />
                                </Paper>
                            )
                        }
                    </div>

                ))}
                {weatherOnly && weatherData?.list?.map((data, i) => (
                    <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <Paper elevation={3} className={classes.paper}>
                            <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                {data.name}
                            </Typography>
                            <Typography className={classes.typography} variant="body1" gutterBottom>
                                {(Number(data.main.temp) - 273.15).toFixed()}°C
                            </Typography>
                            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>
                        </Paper>
                    </div>
                ))}

            </GoogleMapReact>
        </div>
    );
}

export default Map;