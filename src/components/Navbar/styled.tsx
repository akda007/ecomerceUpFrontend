import { styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)({
    position: "relative",
    display: 'flex',
    textDecoration: "none",
    justifyContent: 'center',

    "&::after": {
        content: '""',
        width: "0%",
        height: "3px",
        backgroundColor: 'white',
        position: "absolute",
        bottom: -10,
        transition: "300ms",
        borderRadius: "15px",
        opacity: 0
    },

    "&:hover::after": {
        width: "100%",
        opacity: 1
    }
})

export const HomeButton = styled(Typography)(() => ({
    color: "white",
    
}))