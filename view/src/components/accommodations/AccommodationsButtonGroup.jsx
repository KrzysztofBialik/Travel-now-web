import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Divider } from "@mui/material";
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import { ButtonGroup } from "@mui/material";

export const AccommodationsButtonGroup = ({ clickedButton, groupId }) => {
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
                <Link to={"/accommodations/" + id} className="nav-link">
                    <Button
                        sx={clickedButton === "allAcc" ?
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
                        All Accommodations
                    </Button>
                </Link>
                <Link to={"/accommodations/myAccommodations/" + id} className="nav-link">
                    <Button
                        sx={clickedButton === "myAcc" ?
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
                        My Accommodations
                    </Button>
                </Link>
                <Link to={"/accommodations/myAccommodationVotes/" + id} className="nav-link">
                    <Button
                        sx={clickedButton === "myVotes" ?
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
                        My Votes
                    </Button>
                </Link>
            </ButtonGroup>
        </>
    )
}