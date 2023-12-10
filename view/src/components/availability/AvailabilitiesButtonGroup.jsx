import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import { ButtonGroup } from "@mui/material";

export const AvailabilitiesButtonGroup = ({ clickedButton, groupId }) => {
    const [id, setId] = useState(groupId);
    let ref = useRef();

    useEffect(() => {
        setId(groupId);
    }, [groupId])

    return (
        <>
            <ButtonGroup
                sx={{ display: "flex", alignItems: "center", gap: "5px", my: 4 }}
                ref={ref}
            >
                <Link to={"/availability/" + id} className="nav-link">
                    <Button
                        sx={clickedButton === "myAv" ?
                            {
                                color: "#000000",
                                backgroundColor: "secondary.main",
                                '&:hover': { backgroundColor: "secondary.light" }
                            }
                            :
                            {
                                color: "#FFFFFF",
                                backgroundColor: "primary.main",
                                '&:hover': { backgroundColor: "primary.light" }
                            }
                        }
                    >
                        My Availability
                    </Button>
                </Link>
                <Link to={"/availability/OptimizedDates/" + id} className="nav-link">
                    <Button
                        sx={clickedButton === "optimized" ?
                            {
                                color: "#000000",
                                backgroundColor: "secondary.main",
                                '&:hover': { backgroundColor: "secondary.light" }
                            }
                            :
                            {
                                color: "#FFFFFF",
                                backgroundColor: "primary.main",
                                '&:hover': { backgroundColor: "primary.light" }
                            }
                        }
                    >
                        Optimized Dates
                    </Button>
                </Link>
            </ButtonGroup>
        </>
    )
}