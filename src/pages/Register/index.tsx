/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Stack, TextField, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthenticationContext";
import { api } from "../../axios/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function Register() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const {isAuthenticated} = useAuth()

    const navigate = useNavigate()

    if (isAuthenticated) {
        navigate("/", { replace: true })
    }


    const handleRegister = async () => {
        const res = await api.post("/register", {
            username: username,
            email,
            password
        }).catch((err: AxiosError<any>) => {
            toast.error(err.response?.data.message)
        })

        if (!res) {
            return
        }

        toast.success("Registered!")
        navigate("/login")

    }

    return (
        <>
            <Stack
                bgcolor={"#119DA4"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100vw"}
                height={"100vh"}
            >

                <Stack
                    bgcolor={"white"}
                    borderRadius={10}
                    px={8}
                    py={6}
                    width={"95%"}
                    maxWidth={"700px"}
                    gap={4}
                    boxShadow={"3px 3px 15px 5px #0000002b"}
                >
                    <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Typography variant="h2">Register</Typography>

                        <Link to={"/login"}>
                            <Button color="primary">
                                <ArrowBackIcon/>
                            </Button>
                        </Link>
                    </Stack>
                    
                    <Stack gap={3}>
                        <TextField value={username} onChange={(e) => setUsername(e.target.value)} label="Login" fullWidth></TextField>
                        <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" type="email" fullWidth></TextField>
                        <TextField value={password} onChange={(e) => setPassword(e.target.value)} label="Password" type="password" fullWidth></TextField>

                        <Button variant="contained" sx={{marginTop: 3}} fullWidth onClick={handleRegister}>REGISTER</Button>
                    </Stack>

                </Stack>
            </Stack>
        </>
    )
}