import { useState } from "react";
import { Card } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { ButtonBase } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AddIcon from '@mui/icons-material/Add';
import MapIcon from '@mui/icons-material/Map';
import { PLACEHOLDER_IMAGE } from "../images/Images";


export const AttractionCandidateCard = ({ attractionData, openSelectAttractionDialog }) => {

    const [mapsLink, setMapsLink] = useState(attractionData.url)

    var getPhotoUrl = (photoReference) => {
        return 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' + photoReference + '&key=' + process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    };

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
                                        image={attractionData.photoLink !== null ? getPhotoUrl(attractionData.photoLink) : PLACEHOLDER_IMAGE}
                                    />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: "55%",
                                    minHeight: "180px",
                                    maxHeight: "180px",
                                    mb: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start"
                                }}
                            >
                                <Box sx={{
                                    minHeight: "30%",
                                    maxHeight: "70%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    overflow: "hidden",
                                }}
                                >
                                    <Typography
                                        sx={{
                                            color: "black",
                                            fontSize: "28px",
                                            display: "-webkit-box",
                                            textOverflow: "ellipsis",
                                            WebkitLineClamp: "2",
                                            WebkitBoxOrient: "vertical"
                                        }}
                                        align="left"
                                    >
                                        {attractionData.attractionName}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    height: "30%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        align="left"
                                        sx={{
                                            display: "-webkit-box",
                                            textOverflow: "ellipsis",
                                            WebkitLineClamp: "2",
                                            WebkitBoxOrient: "vertical"
                                        }}
                                    >
                                        {attractionData.address}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </ButtonBase>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "-40px" }}>
                        <Button
                            variant="outlined"
                            target="_blank"
                            rel="noreferrer"
                            onClick={openSelectAttractionDialog}
                            sx={{
                                color: "primary.main",
                                borderColor: "primary.main",
                                borderRadius: "20px",
                                width: "170px",
                                mr: 1,
                                '&:hover': { color: "#FFFFFF", backgroundColor: "primary.main", borderColor: "primary.main" }
                            }}
                        >
                            <AddIcon />
                            <Typography>
                                ADD
                            </Typography>
                        </Button>
                        <Button
                            variant="outlined"
                            target="_blank"
                            rel="noreferrer"
                            href={mapsLink}
                            sx={{
                                color: "primary.main",
                                borderColor: "primary.main",
                                borderRadius: "20px",
                                width: "170px",
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