import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Card } from "@mui/material";
import { Link } from "@mui/material";
import { Icon } from "@mui/material";


export const DashboardOptionCard = ({ icon, title, description, route }) => {

    return (
        <Link underline="none" href={route}>
            <Card
                sx={{
                    boxShadow: 2,
                    borderRadius: "10px",
                    transition: "transform 0.15s ease-in-out",
                    minHeight: "238px",
                    display: "flex",
                    justifyContent: "center",
                    padding: "20px",
                    "&:hover": { transform: "scale3d(1.05, 1.05, 1)", boxShadow: 10 }
                }}>
                <Box lineHeight={1} p={2} textAlign="center">
                    <Typography
                        display="block"
                    >
                        <Icon fontSize="40px">{icon}</Icon>
                    </Typography>
                    <Typography
                        display="block"
                        variant="5"
                        fontWeight="bold"
                        mt={1}
                        mb={1.5}
                    >
                        {title}
                    </Typography>
                    <Typography
                        display="block"
                        variant="body2"
                    >
                        {description}
                    </Typography>
                </Box>
            </Card>
        </Link>
    );
};