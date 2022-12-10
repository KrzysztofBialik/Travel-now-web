import * as React from 'react';
import { useState } from 'react';
import { Dialog } from "@mui/material";
import { Box } from "@mui/material";
import { Card } from '@mui/material';
import { SimpleNavbar } from "../../components/navbars/SimpleNavbar";
import {  useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { doPut } from '../../components/utils/fetch-utils';
import { useNavigate } from 'react-router-dom';

export const URL = '/invite';
export const NAME = "Invite";

export const InvitePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleAcceptInvitation = async () => {
        console.log(searchParams.get("token"))
        if(sessionStorage.getItem("userId") === null) {
            sessionStorage.setItem('token', searchParams.get("token"))
            navigate("/login?" + new URLSearchParams({ redirectTo: '/invite?token=' + searchParams.get("token")}).toString());
        } else {
            await doPut('/api/v1/invitation?' + new URLSearchParams({ token: searchParams.get("token"), user:sessionStorage.getItem("userId")}).toString())
            .then(response => {
                if(response.ok) {
                    navigate('/dashboard')
                }
            })
            .catch(err => {
                console.log(err);
                if(err.message === 'User is already a member of the group') {
                    navigate("/login?");
                }

            });
        }
        
    }

    useEffect(() => {
        handleAcceptInvitation();
      }, [])

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