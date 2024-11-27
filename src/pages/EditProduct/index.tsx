import { Button, Stack, TextField, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { AxiosError } from "axios";
import { api } from "../../axios/api";
import { toast } from "react-toastify";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthenticationContext";

export default function EditProduct() {
    const [searchParams, setSearchParams] = useSearchParams()
    
    const id = searchParams.get("id")

    const [name, setNewName] = useState(searchParams.get("name"))
    const [description, setNewDescription] = useState(searchParams.get("description"))
    const [price, setNewPrice] = useState(Number(searchParams.get("price")))
    const [stock, setNewStock] = useState(Number(searchParams.get("stock")))


    const {token} = useAuth()

    const navigate = useNavigate()

    const handleEdit = async () => {
        const res = await api.put(`/products/${id}`, {
            name, description, price, stock
        }, { headers: {Authorization: `Bearer ${token}`}}).catch((err: AxiosError<any>) => {
            toast.error(err.response?.data.message)
        })  

        if (!res) {
            return
        }

        toast.success("Product Updated!")
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

                            <TextField value={name} onChange={(e) => setNewName(e.target.value)} label="Name"/>
                            <TextField value={description} onChange={(e) => setNewDescription(e.target.value)} label="Description"/>
                            <TextField value={stock} onChange={(e) => setNewStock(Number(e.target.value))} type="number" label="Stock"/>
                            <TextField value={price} onChange={(e) => setNewPrice(Number(e.target.value))} type="number" label="Price"/>
                        </Stack>

                        <Button onClick={handleEdit} variant="contained">Register</Button>

                    </Stack>

                </Stack>
            </Stack>

        </>   
    )
}