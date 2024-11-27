import { Button, Stack, TextField, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { AxiosError } from "axios";
import { api } from "../../axios/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthenticationContext";

export default function RegisterProducts() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)

    const {token} = useAuth()

    const navigate = useNavigate()

    const handleCreate = async () => {
        const res = await api.post("/products", {
            name, description, price, stock
        }, { headers: {Authorization: `Bearer ${token}`}}).catch((err: AxiosError<any>) => {
            toast.error(err.response?.data.message)
        })  

        if (!res) {
            return
        }

        toast.success("Product Created!")
        navigate("/")

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
                        <Typography variant="h4">Register a new product.</Typography>


                        <Stack gap={2} >

                            <TextField value={name} onChange={(e) => setName(e.target.value)} label="Name"/>
                            <TextField value={description} onChange={(e) => setDescription(e.target.value)} label="Description"/>
                            <TextField value={stock} onChange={(e) => setStock(Number(e.target.value))} type="number" label="Stock"/>
                            <TextField value={price} onChange={(e) => setPrice(Number(e.target.value))} type="number" label="Price"/>
                        </Stack>

                        <Button onClick={handleCreate} variant="contained">Register</Button>

                    </Stack>

                </Stack>
            </Stack>

        </>   
    )
}