import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip} from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

const Place = ({place, selected, refProp}) => {
    const classes = useStyles();

    if(selected) refProp?.current?.scrollIntoView({ behavior:"smooth", block:"start"});

    return (
        <Card elevation={6}>
            <CardMedia 
                style={{height:350}}
                image={place.photo ? place.photo.images.large.url : 'https://images.adsttc.com/media/images/5e4c/1025/6ee6/7e0b/9d00/0877/large_jpg/feature_-_Main_hall_1.jpg?1582043123'}
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{place.name}</Typography>
                <Typography gutterBottom variant="h6">{place.distance_string}</Typography>
                <Box display="flex" justifyContent="space-between">
                    <Rating value={Number(place.rating)} readOnly />
                    <Typography gutterBottom variant="subtitle1">out of {place.num_reviews} reviews</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">Price</Typography>
                    <Typography gutterBottom variant="subtitle2">{place.price_level}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle2">{place.ranking}</Typography>
                </Box>
                {place?.awards?.map((award) => (
                    <Box my={1} display="flex" justifyContent="space-between" alignItem="center">
                        <img src={award.images.small} alt={award.display_name}/>
                        <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}
                {place?.cuisine?.map(({name}) => (
                    <Chip key={name} size="small" label={name} className={classes.chip} />
                ))}
                {place?.address && (
                    <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
                        <LocationOnIcon />{place.address}
                    </Typography>
                )}
                {place?.phone && (
                    <Typography gutterBottom variant="body2" color="textSecondary" className={classes.spacing}>
                        <PhoneIcon />{place.phone}
                    </Typography>
                )}
                <CardActions>
                    {place?.web_url && (
                        <Button size="small" color="primary" onClick={() => window.open(place.web_url, "_blank")}>
                            Trip Advisor
                        </Button>
                    )}

                    {place?.website && (
                        <Button size="small" color="primary" onClick={() => window.open(place.website, "_blank")}>
                            Website
                        </Button>
                    )}
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default Place;