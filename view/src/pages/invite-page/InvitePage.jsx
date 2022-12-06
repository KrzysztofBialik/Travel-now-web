import * as React from 'react';
import { useState } from 'react';
import { Dialog } from "@mui/material";
import { Box } from "@mui/material";
import { Card } from '@mui/material';
import { SimpleNavbar } from "../../components/navbars/SimpleNavbar";

export const URL = '/invite';
export const NAME = "Invite";

export const InvitePage = () => {
    return (
        <>
            <SimpleNavbar />
            <Box
                sx={{
                    position: 'relative',
                    minHeight: '100%'
                }}>
                <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifuyContent: "center" }}>
                    <Card sx={{ borderRadius: "20px", width: "300px", height: "300px" }}>
                        Test
                    </Card>
                </Box>
            </Box>
        </>
    );
};