import {  Button, Stack } from "@mui/material";

import logo from "../../assets/logo.svg"
import kart from "../../assets/kart.svg"
import logoutIcon from "../../assets/logout-icon.svg"


import { HomeButton, StyledLink } from "./styled";
import { useAuth } from "../../context/AuthenticationContext";
import { toast } from "react-toastify";

export const navbarHeight = "80px"

export default function Navbar() {

    const {logout} = useAuth()

    const handleLogout = () => {
        logout()

        toast.error("Logged out!")
    }

    return (
        <>
            <div style={{width: "100vw", height: navbarHeight}}></div>        
            <Stack 
                width={"100vw"}
                height={navbarHeight}
                bgcolor={"#0C7489"}
                position={"fixed"}
                top={0}
                flexDirection={"row"}
                alignItems={"center"}
                px={3}
                gap={5}
            >
                <img src={logo} style={{objectFit: "cover", height: "80%"}}></img>
                
                <StyledLink to={"/"}>
                    <HomeButton variant="h6">Home</HomeButton>
                </StyledLink>

                <Stack flexDirection={"row"} style={{marginLeft: 'auto'}} alignItems={"center"} gap={3}>
                    <StyledLink to={"/kart"} >
                        <img src={kart} style={{objectFit: "cover", height: "40px"}}></img>
                    </StyledLink>
                    <Button color="error" onClick={handleLogout}>
                        <img src={logoutIcon} style={{objectFit: "cover", height: "40px"}}></img>
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}