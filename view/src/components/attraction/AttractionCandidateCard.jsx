import { useState } from "react";
import { styled } from '@mui/material/styles';
import { Card } from "@mui/material";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { ButtonBase } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Collapse } from "@mui/material";
import { CardActions } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MapIcon from '@mui/icons-material/Map';


export const AttractionCandidateCard = ({ attractionData, openSelectAttractionDialog }) => {

    const [mapsLink, setMapsLink] = useState(attractionData.url)

    var getPhotoUrl = (photoReference) => {
        return 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' + photoReference + '&key=' + process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    }

    return (
        <>
            <Card
                sx={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "10px",
                    boxShadow: 3,
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: "#dee2e6",
                    "&:hover": {
                        borderColor: "primary.main",
                    }
                }}
                elevation={2}
            >
                <CardContent sx={{ width: "100%" }}>
                    <ButtonBase sx={{
                        width: "100%"
                    }}
                        onClick={openSelectAttractionDialog}
                    >
                        <Box sx={{ display: "flex", flexDirection: "row", justifyCOntent: "space-between", width: "100%", columnGap: "20px" }}>
                            <Box sx={{ width: "40%" }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        height: "200px",
                                        width: "100%"
                                    }}
                                >
                                    <CardMedia
                                        sx={{ borderRadius: "10px" }}
                                        component="img"
                                        image={getPhotoUrl(attractionData.photoLink)}
                                    />
                                </Box>
                            </Box>
                            {/* <Box
                                sx={{
                                    width: "55%",
                                    minHeight: "150px",
                                    maxHeight: "150px"
                                }}
                            > */}
                            {/* <Box
                                    sx={{
                                        height: "100%",
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between"
                                    }}
                                > */}
                            {/* <Box
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-start",
                                        alignItems: "flex-start"
                                    }}
                                > */}
                            <Box
                                sx={{
                                    width: "55%",
                                    minHeight: "150px",
                                    maxHeight: "150px",
                                    mb: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start"
                                }}
                            >
                                <Typography
                                    sx={{
                                        height: "50%",
                                        color: "black",
                                        fontSize: "28px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}
                                    align="left"
                                >
                                    {/* {attractionData.attractionName} */}
                                    aaaaaaa
                                    aaaaaaaaaaaaaaaa
                                    aaaaaaaaaaaaaaaa
                                    aaaaaaa
                                    aaaa
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        height: "50%"
                                    }}
                                    align="left"
                                >
                                    {attractionData.address}
                                </Typography>
                            </Box>
                            {/* </Box> */}
                            {/* </Box> */}
                            {/* </Box> */}
                        </Box>
                    </ButtonBase>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: -5 }}>
                        <Button
                            variant="outlined"
                            target="_blank"
                            rel="noreferrer"
                            href={mapsLink}
                            // sx={{
                            //     color: "secondary.main",
                            //     borderColor: "secondary.main",
                            //     borderRadius: "20px",
                            //     width: "180px",
                            //     '&:hover': { color: "#000000", backgroundColor: "secondary.main", borderColor: "secondary.main" }
                            // }}
                            sx={{
                                color: "primary.main",
                                borderColor: "primary.main",
                                borderRadius: "20px",
                                width: "180px",
                                '&:hover': { color: "#FFFFFF", backgroundColor: "primary.main", borderColor: "primary.main" }
                            }}
                        >
                            <MapIcon sx={{ mr: "10px" }} />
                            <Typography>
                                See in maps
                            </Typography>
                        </Button>
                    </Box>
                </CardContent>
            </Card >
        </>
    );
};