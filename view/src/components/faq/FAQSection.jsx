import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import { Box } from '@mui/material';
import { Card } from '@mui/material';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const FAQSection = () => {
    const [expanded, setExpanded] = useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box sx={{ width: "100%", position: "absolute", bottom: 0, height: "15vh" }}>
            <Box sx={{
                px: 10,
                py: 2,
                backgroundColor: "primary.dark",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px"
            }}>
                <Typography sx={{ mb: 4, color: "#FFFFFF" }} variant="h3">
                    FAQ section
                </Typography>
                <Accordion sx={{ borderRadius: "20px", mb: "2px" }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary sx={{ backgroundColor: "primary" }} aria-controls="panel1d-content" id="panel1d-header">
                        <Typography sx={{ fontWeight: "800" }}>1. Is Travel Now free of charge?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Travel Now is a free platform for everyone which gives an opportunity for planning the vacations of your dreams.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ borderRadius: "20px", mb: "2px" }} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography sx={{ fontWeight: "800" }}>2. How can I create a trip group?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            You can create a new trip directly from dashboard. Just select the "create trip" button.
                            After pressing it, a form is displayed specifying basic information about the trip:
                            name, starting place, currency, minimum target number of days and participants,
                            and an optional description. After completing the form correctly, the user receives confirmation in the
                            form of a dialogue about the creation of a new trip. You can always change these informations
                            during the planning phase of the trip.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ borderRadius: "20px", mb: "2px" }} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography sx={{ fontWeight: "800" }}>3. How can I invite my friends to the trip group?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            To invite a user to our travel group, you must be a coordinator. This option is available in the upper
                            right part in the participants section (only at the planning stage). After pressing the button,
                            a dialogue appears with a link that we must copy and send to the person we want to invite. The person who
                            receives the link, after pasting it in the browser, will be redirected to the login page.
                            After logging in correctly or creating an account and logging in (if the individual doesn't have one),
                            he/she will be automatically added to the trip group.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ borderRadius: "20px", mb: "2px" }} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                        <Typography sx={{ fontWeight: "800" }}>4. How can I add my accommodation for the trip group?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Both the participant and the coordinator can add their accommodation suggestions. To do this,
                            go to the "My accommodations" section. After clicking the add accommodation button, a dialogue
                            appears with a form that must be completed to do so. The user can use links to accommodation from
                            the booking.com and Airbnb platforms. The link to booking.com should be in a specific form, what
                            the information is about. In addition to the link, you must provide the price for such accommodation,
                            and it is also possible to provide an additional description for other participants.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ borderRadius: "20px", mb: "2px" }} expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                        <Typography sx={{ fontWeight: "800" }}>5. What are the optimized dates?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Due to the difficulty of choosing the most suitable date range, Travel Now offers a date optimization algorithm.
                            This view contains dates generated by the system based on the declared availability of all participants.
                            These proposals meet the minimum number of days and participants restrictions specified in the group settings.
                            If such dates are missing, appropriate information is displayed. However, if such a range is found, it is marked
                            both on the calendar and in the table. Using the accept button, as a coordinator, we can select the generated date
                            range as the one for the departure. These dates are not binding and can be changed in the trip summary section.
                            There is no obligation to select dates from the optimized dates section, you can also enter them in the summary view.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ borderRadius: "20px", mb: "2px" }} expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                    <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
                        <Typography sx={{ fontWeight: "800" }}>6. How can I create a day plan?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Creating a daily plan is done by clicking the add button in the "Day plans" section and completing the form correctly.
                            The user must provide the name, date and select the icon that best suits the plan. The date must be within the range of
                            dates declared at the planning stage. You can only create one daily plan for each day of your departure. Created daily
                            plans can be edited and deleted if the participant has coordinator status. These options are available by clicking on
                            the three-dot icon.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ borderRadius: "20px", mb: "2px" }} expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                    <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
                        <Typography sx={{ fontWeight: "800" }}>7. What kind of attractions can I add to my day plan? How can I do this?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            You can add whatever attraction you want to your day plan. Only requirement is coordinator status in the trip group.
                            This can be done using a browser in which we enter the names of places or facilities that interest us, from restaurants,
                            through museums to sports stadiums. To use the browser, the coordinator must click the add button in the attractions section.
                            As a result of this action, a dialogue will appear with a field for entering the appropriate phrase. The password will be
                            searched after pressing the Enter button, the magnifying glass icon or the button with the word "Search". What is more you can
                            Ability to search and add attractions in the user's area to the daily schedule based on their location at a given moment.
                            There is an "Add Nearby" button in the agenda view. After pressing it, a search screen based on our location will be displayed,
                            where you will be able to search based on the selected category or sorting type.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ borderRadius: "20px", mb: "2px" }} expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                    <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
                        <Typography sx={{ fontWeight: "800" }}>8. How can i add my expenses?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            To add an expense incurred by a participant, press the add button in the upper right corner of the "Expenditures" section in the finances view.
                            Please add the title of the expense, the amount and the persons to whom the payment applies. If the user only adds himself,
                            the payment will not be displayed because it will not affect the overall balance of the trip. After adding expenses, the bars on the balance
                            chart begin to show the overall balance values ​​of each trip participant. You can modify and delete expenses, but this will
                            affect your settlements.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ borderRadius: "20px", mb: "2px" }} expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                    <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
                        <Typography sx={{ fontWeight: "800" }}>9. How can I leave trip group?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            You can leave trip group at any time, no matter the stage of the trip group. Only requirement is that you do not have
                            any pending settlements.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ borderRadius: "20px", mb: "20px" }} expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
                    <AccordionSummary aria-controls="panel10d-content" id="panel10d-header">
                        <Typography sx={{ fontWeight: "800" }}>10. How are settlements generated?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            After adding an expenditure or accepting an update, application updates who should transfer how much and to whom.
                            All settlements, both current and settled, are settled in "settlement" parts. On the left side there are settlements
                            that concern a given user (who is to transfer how much and to whom the transfer is to be made). On the right side there
                            are settlements that do not concern the user. Everyone received information about who should receive whom, how much and
                            their status.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
}