import { Button, Stack, TextField, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { AxiosError } from "axios";
import { api } from "../../axios/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthenticationContext";

export default function RegisterSupplier() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const {token} = useAuth()

    const navigate = useNavigate()

    const handleCreate = async () => {
        const res = await api.post("/supplier/create", {
            name, description
        }, { headers: {Authorization: `Bearer ${token}`}}).catch((err: AxiosError<any>) => {
            toast.error(err.response?.data.message)
        })  

        if (!res) {
            return
        }

        toast.success("Supplier Registered!")
        navigate("/list-supplier")

    }

    return (
        <>
            <Stack width={"100vw"} height={"100vh"} bgcolor={"#d6d6d6"}>
                <Navbar />

                <Stack flexGrow={1} alignItems={"center"} justifyContent={"center"}>

                    <Stack
                        bgcolor={"white"}
                        py={3} px={4} gap={2}
                        maxWidth={"600px"}
                        width={"95%"}
                        borderRadius={5}
                        boxShadow={"3px 3px 15px 5px rgba(0,0,0,0.1)"}
          
                    >
                        <Typography variant="h4">Register a new Supplier.</Typography>


                        <Stack gap={2} >

                            <TextField value={name} onChange={(e) => setName(e.target.value)} label="Name"/>
                            <TextField value={description} onChange={(e) => setDescription(e.target.value)} label="Description"/>
                        </Stack>

                        <Button onClick={handleCreate} variant="contained">Register</Button>

                    </Stack>

                </Stack>
            </Stack>

        </>   
    )
}