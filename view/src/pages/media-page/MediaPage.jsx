import { Box } from '@mui/system';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';


export const URL = '/media';
export const NAME = "Media";

export const MediaPage = () => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY });
    return (
        <Box sx={{ height: "100vh", width: "100%" }}>
            <GoogleMap
                zoom={10}
                center={{ lat: 44, lng: -80 }}
                height="100vh"
                width="100%"
            >
                <Marker position={{ lat: 44, lng: -80 }} />
            </GoogleMap>
        </Box>

    )
}