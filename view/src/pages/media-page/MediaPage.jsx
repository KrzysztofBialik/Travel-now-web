import { Box } from '@mui/system';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';


export const URL = '/media';
export const NAME = "Media";

export const MediaPage = () => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyB_LnZb_xzPsA5pmGVVoPTs3RNbO-9bCKo" });
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