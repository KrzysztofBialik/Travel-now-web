import React from 'react';
import { Box, Card } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';

import './DashboardFlipCard.css';


export const DashboardFlipCard = ({ frontBg, backBg, title, description, action }) => {

    return (
        <Card className="flip-card"
            sx={{
                borderRadius: "10px",
                height: "500px",
                perspective: "1000px",
                backgroundColor: "transparent"
            }}
            elevation={0}>
            <Box className="flip-card-inner">
                <Box className="flip-card-front"
                    sx={{
                        // backgroundColor: "primary.main"
                        // backgroundImage: `url(${frontBg})`,
                        // backgroundSize: "cover",
                        // backgroundPosition: "center",
                        // backgroundImage: "linear-gradient(to bottom right, #24939e, #55ccd9)",
                        backgroundImage: "linear-gradient(to bottom right, #55ccd9, #24939e)"
                    }}
                >
                    <Box py={12} px={3} textAlign="center" lineHeight={1}>
                        <Typography variant="h3" gutterBottom
                            sx={{
                                color: "white"
                            }}
                        >
                            {title}
                        </Typography>
                        {/* <Typography variant="h6"
                            sx={{
                                color: "white",
                            }}
                        >
                            {description}
                        </Typography> */}
                    </Box>
                </Box>
                <Box className="flip-card-back"
                    sx={{
                        // backgroundColor: "primary.main"
                        // backgroundImage: "linear-gradient(to bottom right, #24939e, #55ccd9)",
                        backgroundImage: "linear-gradient(to bottom right, #55ccd9, #24939e)"
                    }}>
                    <Box pt={12} pb={2} px={2} textAlign="center" lineHeight={1}>
                        <Typography variant="h3" color="#FFFFFF" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h6" color="#FFFFFF" opacity={0.8}>
                            {action.description}
                        </Typography>
                        {action && (
                            <Box width="50%" mt={4} mb={2} mx="auto">
                                <Button
                                    href={action.route}
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    sx={{
                                        borderRadius: "20px",
                                        "&:hover": {
                                            color: "#000000"
                                        }
                                    }}
                                >
                                    {action.label}
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};