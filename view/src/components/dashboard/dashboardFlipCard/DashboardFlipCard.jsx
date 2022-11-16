import React from 'react';
import { Box, Card } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';

import './DashboardFlipCard.css';


export const DashboardFlipCard = ({ frontBg, backBg, title, description, action }) => {

    return (
        <Card className="flip-card" sx={{ borderRadius: "10px" }} elevation={0}>
            <Box className="flip-card-inner">
                <Box className="flip-card-front"
                    sx={{
                        backgroundImage: `url(${frontBg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <Box py={12} px={3} textAlign="center" lineHeight={1}>
                        <Typography variant="h3" gutterBottom
                            sx={{
                                textShadow: "0 0 3px #000000",
                                color: "white"
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography variant="h6"
                            sx={{
                                textShadow: "-1px 1px 0 #000",
                                color: "white",
                            }}
                        >
                            {description}
                        </Typography>
                    </Box>
                </Box>
                <Box className="flip-card-back"
                    sx={{
                        backgroundColor: "primary.main"
                    }}>
                    <Box pt={12} pb={2} px={2} textAlign="center" lineHeight={1}>
                        <Typography variant="h3" color="#000000" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h6" color="#000000" opacity={0.8}>
                            {action.description}
                        </Typography>
                        {action && (
                            <Box width="50%" mt={4} mb={2} mx="auto">
                                <Button href={action.route} size="large" fullWidth
                                    sx={{
                                        color: "#000000",
                                        backgroundColor: "secondary.main",
                                        borderRadius: "20px",
                                        "&:hover": { backgroundColor: "secondary.dark", boxShadow: 5, color: "#000000" }
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