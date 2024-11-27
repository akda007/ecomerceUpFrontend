import { Button, Stack, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { api } from "../../axios/api";
import { useAuth } from "../../context/AuthenticationContext";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

type SupplierInfo = {
    name: string
    description: string
}

export default function ListSuppliers() {
    const [suppliers, setSuppliers] = useState<SupplierInfo[]>([])

    const {token} = useAuth()

    useEffect(() => {
        (async () => {
            const res = await api.get<SupplierInfo[]>("/supplier", {headers: {Authorization: `Bearer ${token}`}}).catch((err: AxiosError<any>) => {
                toast.error(err.response?.data.message)
            })

            if (!res) return

            setSuppliers(res.data)
        })()
    }, [])

    return (
        <>
            <Navbar/>

            <Stack py={3} px={2} flexDirection={"row"} justifyContent={"flex-end"}>
                <Link to={"/register-supplier"}>
                    <Button variant="outlined">ADD NEW</Button>
                </Link>
            </Stack>

            <Stack gap={2} px={5}>
                {suppliers.map(value =>
                    <Stack minWidth={"400px"} width={"fit-content"} py={2} px={3} bgcolor={"#0C7489"} borderRadius={4}>
                        <Typography variant="h5">{value.name}</Typography>
                        <Typography>{value.description}</Typography>
                    </Stack>
                )}
            </Stack>
        </>
    )
}