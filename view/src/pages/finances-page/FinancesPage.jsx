import { useState } from "react";
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { Card } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { useParams } from "react-router-dom";
import { NavigationNavbar } from "../../components/navbars/navigationNavbar/NavigationNavbar";
import { currentTripButtonsDataWithGroupId } from "../../components/navbars/navigationNavbar/NavbarNavigationData";
import { pastTripButtonsData } from "../../components/navbars/navigationNavbar/NavbarNavigationData";
import { ExpenditureCard } from "../../components/finances/ExpenditureCard";
import { AddExpenditureDialog } from "../../components/finances/AddExpenditureDialog";
import { SettlementCard } from "../../components/finances/SettlementCard";
import { BalanceChart } from "../../components/finances/BalanceChart";
import { doGet } from "../../components/utils/fetch-utils";
import { parseISO } from "date-fns/esm";


export const URL = '/finances/:groupId';
export const NAME = "Finances";


export const FinancesPage = () => {
    const { groupId } = useParams();
    const [addExpenditureDialogOpen, setAddExpenditureDialogOpen] = useState(false);
    const [myExpendituresButtonOn, setMyExpendituresButtonOn] = useState(false);
    const [myContributionsButtonOn, setMyContributionsButtonOn] = useState(false);
    const [expendituresData, setExpendituresData] = useState([]);
    const [allExpenditureCreators, setAllExpenditureCreators] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState([])
    const [allExpenditures, setAllExpenditures] = useState([])
    const [settlementsData, setSettlementsData] = useState([])
    const [balanceData, setBalanceData] = useState([])
    const [fullBalanceData, setFullBalanceData] = useState([])


    const getBalanceData = async (userList) => {
        await doGet('/api/v1/finance-optimizer/balance?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => {
                const map = new Map(Object.entries(response));
                var balanceMaxFullData = [];

                for (var i = 0; i < userList.length; i++) {
                    var balance = map.get((userList[i].id).toString());
                    if (balance !== undefined) {
                        var balanceUser = {}
                        balanceUser['id'] = userList[i].id;
                        balanceUser['user'] = userList[i].fullName;
                        balanceUser['balance'] = balance;
                        balanceMaxFullData.push(balanceUser);
                    }
                    else {
                        var balanceUser = {}
                        balanceUser['id'] = userList[i].id;
                        balanceUser['user'] = userList[i].fullName;
                        balanceUser['balance'] = 0.0;
                        balanceMaxFullData.push(balanceUser);
                    }
                }
                setBalanceData(balanceMaxFullData);

            })
            .catch(err => console.log('Request Failed', err));
    }

    useEffect(() => {

    }, [balanceData])

    const getAllUsersInGroup = async () => {
        await doGet('/api/v1/user-group/participants?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => {
                setCurrentUser(response.find(user => user.userId === parseInt(localStorage.getItem("userId"))))
                const person = response.map(user => ({ id: user.userId, fullName: user.firstName + " " + user.surname }));
                setAllUsers(person);
                getExpendituresData(person)
                getSettlementsData(person);
                getBalanceData(person);
            })
            .catch(err => console.log('Request Failed', err));
    }

    const getSettlementsData = async (userList) => {
        await doGet('/api/v1/finance-request?' + new URLSearchParams({ groupId: groupId, userId: localStorage.getItem("userId") }).toString())
            .then(response => response.json())
            .then(response => {
                var set = response.map(settlement => {
                    const debtor = userList.find(user => user.id === settlement.debtor).fullName;
                    const debtee = userList.find(user => user.id === settlement.debtee).fullName;
                    const debtorId = settlement.debtor;
                    const debteeId = settlement.debtee

                    return ({
                        id: settlement.financialRequestId, amount: settlement.amount, debtor: debtor, debtee: debtee, debtorId: debtorId, debteeId: debteeId, status: settlement.status
                    })
                });
                setSettlementsData(set);
                setOtherSettlements(set.filter(settlement =>
                    settlement.debteeId !== parseInt(localStorage.getItem("userId")) && settlement.debtorId !== parseInt(localStorage.getItem("userId"))).map(settlement => {
                        return (
                            <ListItem sx={{ p: 0, my: "10px" }} key={settlement.id}>
                                <SettlementCard
                                    settlementData={settlement}
                                    canResolve={false}
                                    groupId={groupId}
                                    requestId={settlement.id}
                                    onSuccess={() => getAllUsersInGroup()}

                                />
                            </ListItem>

                        )
                    }));
                setMySettlements(set.filter(settlement =>
                    settlement.debtorId === parseInt(localStorage.getItem("userId")) || settlement.debteeId === parseInt(localStorage.getItem("userId"))).map(settlement => {
                        return (
                            <ListItem sx={{ p: 0, my: "10px" }} key={settlement.id}>
                                <SettlementCard
                                    settlementData={settlement}
                                    canResolve={settlement.debteeId === parseInt(localStorage.getItem("userId")) && settlement.status === "PENDING"}
                                    groupId={groupId}
                                    requestId={settlement.id}
                                    onSuccess={() => getAllUsersInGroup()}
                                />
                            </ListItem>
                        )
                    }));

            })
            .catch(err => console.log('Request Failed', err));
    }
    const getExpendituresData = async (userList) => {
        await doGet('/api/v1/finance-optimizer?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => {
                setExpendituresData(response.map(expenditure => {
                    const person = userList.find(user => user.id === expenditure.creatorId).fullName;
                    const isDebtor = expenditure.expenseDebtors.some(debtor => debtor === parseInt(localStorage.getItem("userId")))
                    const contributors = expenditure.expenseDebtors.map(ed => {
                        return ({ name: userList.find(user => user.id === ed).fullName })
                    })
                    return ({
                        id: expenditure.expenditureId, personId: expenditure.creatorId, person: person,
                        title: expenditure.title, cost: expenditure.price, date: parseISO(expenditure.generationDate), isDebtor: isDebtor, contributors: contributors
                    })
                }))
            })
            .catch(err => console.log('Request Failed', err));
    }


    useEffect(() => {
        getAllUsersInGroup();
    }, [])

    useEffect(() => {
        setAllExpenditures(expendituresData.map(expenditure => (
            <ListItem sx={{ p: 0, my: "10px" }} key={expenditure.id}>
                <ExpenditureCard expenditureData={expenditure} />
            </ListItem>
        )));
    }, [expendituresData])


    const [otherSettlements, setOtherSettlements] = useState([]);
    const [mySettlements, setMySettlements] = useState([]);

    const groupStage = 2;
    const isCoordinator = true;

    const test = () => {
        setAllExpenditures(expendituresData.map(expenditure => (
            <ListItem sx={{ p: 0, my: "10px" }} key={expenditure.id}>
                <ExpenditureCard expenditureData={expenditure} />
            </ListItem>
        )));
    };

    const showUsersExpenditures = () => {
        if (myContributionsButtonOn) {
            setMyContributionsButtonOn(false);
        }

        if (myExpendituresButtonOn) {
            setAllExpenditures(expendituresData.map(expenditure => (
                <ListItem sx={{ p: 0, my: "10px" }} key={expenditure.id}>
                    <ExpenditureCard expenditureData={expenditure} />
                </ListItem>
            )));
        }
        else {
            setAllExpenditures(expendituresData.filter(expenditure => expenditure.personId === currentUser.userId).map(expenditure => (
                <ListItem sx={{ p: 0, my: "10px" }} key={expenditure.id}>
                    <ExpenditureCard expenditureData={expenditure} />
                </ListItem>
            )));
        }

        setMyExpendituresButtonOn(!myExpendituresButtonOn);
    };

    const showUsersContributions = () => {
        if (myExpendituresButtonOn) {
            setMyExpendituresButtonOn(false);
        }

        if (myContributionsButtonOn) {
            setAllExpenditures(expendituresData.map(expenditure => (
                <ListItem sx={{ p: 0, my: "10px" }} key={expenditure.id}>
                    <ExpenditureCard expenditureData={expenditure} />
                </ListItem>
            )));
        }
        else {
            setAllExpenditures(expendituresData.filter(expenditure => expenditure.debtors === true).map(expenditure => (
                <ListItem sx={{ p: 0, my: "10px" }} key={expenditure.id}>
                    <ExpenditureCard expenditureData={expenditure} />
                </ListItem>
            )));
        }
        setMyContributionsButtonOn(!myContributionsButtonOn);
    };

    return (
        <>
            <AddExpenditureDialog
                open={addExpenditureDialogOpen}
                onClose={() => setAddExpenditureDialogOpen(false)}
                participants={allUsers}
                groupId={groupId}
                onSuccess={() => getAllUsersInGroup()}
            />
            <Box
                sx={{
                    position: 'relative',
                    minHeight: '100%'
                }}>
                <NavigationNavbar
                    buttonsData={groupStage === 2 ? currentTripButtonsDataWithGroupId(groupId) : pastTripButtonsData}
                    groupId={groupId}
                />
                <Box sx={{
                    pt: 10,
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "column",
                    minWidth: "1200px",
                    minHeight: "100%",
                    margin: 0
                }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            minWidth: "90%",
                            maxWidth: "90%",
                            minHeight: "100%",
                        }}
                    >
                        <Grid container spacing={10} sx={{
                            display: "flex", justifyContent: "center", alignItems: "center", mb: 10
                        }}>

                            {/* ----------------------------------------------------EXPENDITURES---------------------------------------------------- */}
                            <Grid item xs={6} md={6}>
                                <Card
                                    sx={{
                                        overflow: "visible",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-start",
                                        position: "relative",
                                        overflowWrap: "break-word",
                                        backgroundClip: "border-box",
                                        minHeight: "600px",
                                        maxHeight: "600px",
                                        minWidth: "500px",
                                        borderRadius: "10px"
                                    }}
                                    elevation={16}
                                >
                                    <Box
                                        sx={{
                                            mx: 2,
                                            mt: -3,
                                            py: 2,
                                            px: 2,
                                            backgroundColor: "primary.main",
                                            color: "#000000",
                                            borderRadius: "0.5rem",
                                            boxShadow: "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", columnGap: 1 }}>
                                            <ReceiptIcon sx={{ color: "#FFFFFF", fontSize: "32px" }} />
                                            <Typography sx={{ color: "#FFFFFF", fontSize: "32px" }}>
                                                Expenditures
                                            </Typography>
                                        </Box>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: "secondary.main",
                                                borderRadius: "20px",
                                                "&:hover": { backgroundColor: "secondary.dark" }
                                            }}
                                            onClick={() => setAddExpenditureDialogOpen(true)}
                                        >
                                            <AddIcon />
                                            Add
                                        </Button>
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "stretch",
                                        flexDirection: "column",
                                        justifyContent: "flex-start",
                                        justifyItems: "center",
                                        margin: 2,
                                        minHeight: "200px"
                                    }}>
                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                mb: 1
                                            }} >
                                            <Button
                                                sx={{
                                                    borderRadius: "20px",
                                                    fontSize: "15px",
                                                    mr: 2,
                                                    color: myExpendituresButtonOn ? "#FFFFFF" : "primary.main",
                                                    backgroundColor: myExpendituresButtonOn ? "primary.main" : "#FFFFFF",
                                                    "&:hover": {
                                                        backgroundColor: myExpendituresButtonOn ? "primary.main" : "#FFFFFF"
                                                    }
                                                }}
                                                variant="outlined"
                                                onClick={showUsersExpenditures}
                                            >
                                                My expenditures
                                            </Button>
                                            <Button
                                                sx={{
                                                    borderRadius: "20px",
                                                    fontSize: "15px",
                                                    color: myContributionsButtonOn ? "#FFFFFF" : "primary.main",
                                                    backgroundColor: myContributionsButtonOn ? "primary.main" : "#FFFFFF",
                                                    "&:hover": {
                                                        backgroundColor: myContributionsButtonOn ? "primary.main" : "#FFFFFF"
                                                    }
                                                }}
                                                variant="outlined"
                                                onClick={() => showUsersContributions()}
                                            >
                                                My contributions
                                            </Button>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "flex-start",
                                                minHeight: "400px",
                                                overflow: "auto"
                                            }}
                                        >
                                            {allExpenditures.length === 0 ?
                                                <Box sx={{ width: "100%", minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <Typography sx={{ color: "primary.main", fontSize: "32px" }}>
                                                        Add expenditures
                                                    </Typography>
                                                </Box>
                                                :
                                                <>
                                                    <List
                                                        sx={{
                                                            width: "90%",
                                                            p: 0,
                                                        }}
                                                    >
                                                        {allExpenditures}
                                                    </List>
                                                </>
                                            }
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>

                            {/* ----------------------------------------------------BALANCES---------------------------------------------------- */}
                            <Grid item xs={6} md={6} >
                                <Card
                                    sx={{
                                        height: "100%",
                                        overflow: "visible",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-start",
                                        position: "relative",
                                        overflowWrap: "break-word",
                                        backgroundClip: "border-box",
                                        minHeight: "600px",
                                        maxHeight: "600px",
                                        minWidth: "400px",
                                        // minWidth: "600px",
                                        // maxWidth: "650px",
                                        borderRadius: "10px"
                                    }}
                                    elevation={16}
                                >
                                    <Box
                                        sx={{
                                            mx: 2,
                                            mt: -3,
                                            py: 2,
                                            px: 2,
                                            backgroundColor: "primary.main",
                                            color: "#000000",
                                            borderRadius: "0.5rem",
                                            boxShadow: "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", columnGap: 1 }}>
                                            <SyncAltIcon sx={{ color: "#FFFFFF", fontSize: "32px" }} />
                                            <Typography sx={{ color: "#FFFFFF", fontSize: "32px" }}>
                                                Balances
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "stretch",
                                        flexDirection: "column",
                                        justifyContent: "flex-start",
                                        justifyItems: "center",
                                        margin: 2,
                                        minHeight: "200px"
                                    }}>

                                        <Box
                                            sx={{
                                                // height: "800px",
                                                maxHeight: "500px",
                                                overflowY: "auto"
                                            }}
                                        >
                                            {/* {balanceData.length === 0 ?
                                                <Box sx={{ width: "80%", height: '500px', display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <Typography sx={{ color: "primary.main", fontSize: "32px" }}>
                                                        Chart will appear when unresolved settlements appear
                                                    </Typography>
                                                </Box>
                                                :
                                                <BalanceChart balancesData={balanceData} />
                                            } */}
                                            <BalanceChart
                                                balancesData={balanceData}
                                            />
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>

                            {/* ----------------------------------------------------SETTLEMENTS---------------------------------------------------- */}
                            <Grid item xs={12}>
                                <Card
                                    sx={{
                                        overflow: "visible",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        position: "relative",
                                        overflowWrap: "break-word",
                                        backgroundClip: "border-box",
                                        minHeight: "500px",
                                        maxHeight: "1000px",
                                        minWidth: "1000px",
                                        borderRadius: "10px"
                                    }}
                                    elevation={16}
                                >
                                    <Box
                                        sx={{
                                            mx: 2,
                                            mt: -3,
                                            py: 2,
                                            px: 2,
                                            backgroundColor: "secondary.main",
                                            color: "#FFFFFF",
                                            borderRadius: "0.5rem",
                                            boxShadow: "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125",
                                            display: "flex",
                                            flexDirection: "row"
                                        }}
                                    >
                                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", columnGap: 1 }}>
                                            <HandshakeIcon sx={{ color: "#000000", fontSize: "32px" }} />
                                            <Typography variant="h6" sx={{ color: "#000000", fontSize: "32px" }}>
                                                Settlements
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        minHeight: "450px",
                                        maxHeight: "950px",
                                        width: "100%"
                                    }}
                                    >
                                        <Box
                                            sx={{
                                                width: "45%",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                mx: 3,
                                                overflow: "auto",
                                            }}
                                        >
                                            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", my: 2 }}>
                                                <Typography sx={{ color: "primary.main", fontSize: "32px" }}>
                                                    My settlements
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: mySettlements.length === 0 ? "center" : "flex-start",
                                                    minHeight: "400px",
                                                    maxHeight: "800px",
                                                    overflow: "auto"
                                                }}
                                            >
                                                {mySettlements.length === 0 ?
                                                    <Typography sx={{ color: "primary.dark", fontSize: "24px", mt: -10 }}>
                                                        You have no settlements right now.
                                                    </Typography>
                                                    :
                                                    <>
                                                        <List
                                                            sx={{
                                                                width: "90%",
                                                                p: 0,
                                                            }}
                                                        >
                                                            {mySettlements}
                                                        </List>
                                                    </>
                                                }
                                            </Box>
                                        </Box>
                                        {/* <Box sx={{
                                            minHeight: "500px",
                                            maxHeight: "1000px", 
                                            width: "4px",
                                            backgroundColor: "primary.dark"
                                        }} /> */}
                                        <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 4, borderColor: "primary.dark" }} />
                                        <Box
                                            sx={{
                                                width: "45%",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                mx: 3,
                                            }}
                                        >
                                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 2 }}>
                                                <Typography sx={{ color: "primary.main", fontSize: "32px" }}>
                                                    Other settlements
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: otherSettlements.length === 0 ? "center" : "flex-start",
                                                    minHeight: "400px",
                                                    maxHeight: "800px",
                                                    overflow: "auto",
                                                }}
                                            >
                                                {otherSettlements.length === 0 ?
                                                    <Typography sx={{ color: "primary.dark", fontSize: "24px", mt: -10 }}>
                                                        There are no settlements in the group right now.
                                                    </Typography>
                                                    :
                                                    <>
                                                        <List
                                                            sx={{
                                                                width: "90%",
                                                                p: 0,
                                                            }}
                                                        >
                                                            {otherSettlements}
                                                        </List>
                                                    </>
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Box >
            </Box >
        </>
    );
}


// const subbox = document.querySelector('.subbox');
// subbox.style.height = '500px';
