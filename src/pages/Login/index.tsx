/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Stack, TextField, Typography } from "@mui/material";

import logo from "../../assets/logo.svg"
import { useState } from "react";
import { useAuth } from "../../context/AuthenticationContext";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../axios/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function Login() {
    document.title = "Login"

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const {login, isAuthenticated} = useAuth()

    const navigate = useNavigate()

    if (isAuthenticated) {
        navigate("/", { replace: true })
    }


    const handleLogin = async () => {
        const res = await api.post("/login", {
            username: username,
            password
        }).catch((err: AxiosError<any>) => {
            toast.error(err.response?.data.message)
        })

        if (!res) {
            return
        }

        login(res.data.token)

        toast.success("Logged In!")
        navigate("/")

    }

    return (
        <>
            <Stack flexDirection={"row"} width={"100vw"} height={"100vh"}>
                <Stack
                    alignItems={"center"}
                    justifyContent={"center"}
                    flexGrow={"1"}
                    bgcolor={"#119DA4"}
                >
                    <img src={logo} style={{objectFit: "cover", width: "45%"}}></img>
                </Stack>
                <Stack
                    flexDirection={"column"}
                    alignItems={"center"}
                    py={5}
                    px={10}
                    width={"45%"}
                    maxWidth={"750px"}
                    minWidth={"450px"}
                    gap={5}
                >
                    <Typography variant="h2" width={"100%"}>Login</Typography>

                    <Stack flexDirection={"column"} width={"100%"} gap={3}>
                        <TextField label="Login" value={username} onChange={(e) => setUsername(e.target.value)}></TextField>
                        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></TextField>


                        <Stack gap={1} mt={1}>
                            <Link to={"/register"} replace>
                                <Button variant="outlined" fullWidth>REGISTER</Button>
                            </Link>
                            <Button variant="contained"  fullWidth onClick={handleLogin}>SIGN IN</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}