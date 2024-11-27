/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid2 as Grid, Stack, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import ProductView from "../../components/ProductView";
import { useEffect, useState } from "react";
import { api } from "../../axios/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthenticationContext";

type ProductInfo = {
    id: number,
    name: string,
    description: string,
    price: number,
    stock: number
}

export default function Home() {
    const [products, setProducts] = useState<ProductInfo[]>([])

    const {token} = useAuth()

    useEffect(() => {
        (async () => {
            const res = await api.get<ProductInfo[]>("/products", {headers: {Authorization: `Bearer ${token}`}}).catch((err: AxiosError<any>) => {
                toast.error(err.response?.data.message)
            })

            if (!res) return

            setProducts(res.data)
        })()
    }, [])

    const handleAdd = async (id: number) => {
        const res = await api.post<{message: string}>(
            "/kart/products/add",
            {
                productId: id,
                amount: 1
            },
            {
                headers: {Authorization: `Bearer ${token}`}
            })
        .catch((err: AxiosError<any>) => {
            toast.error(err.response?.data.message ?? err.message)
        })

        if (!res) return

        toast.success(res.data.message)
    }

    return (
        <>
            <Navbar></Navbar>
            <Stack width={"100vw"} px={8} py={4}>
                <Typography variant="h3">Products</Typography>

                

                <Grid mt={4} container spacing={10} columnSpacing={{xs: 12, sm: 6, md: 4, xl: 3}}>
                    { (() => {
                        if (products.length === 0)
                            return <Typography>Nenhum produto disponivel</Typography>
                            
                        return <></>
                    })()}
                    {products.map(p => 
                        <Grid size={{xs: 12, sm: 6, md: 4, xl: 3}}>
                            <ProductView 
                                id={p.id}
                                name={p.name}
                                description={p.description}
                                onClick={handleAdd}
                                price={p.price}
                                stock={p.stock}
                            />
                        </Grid>
                    )}
                </Grid>

            </Stack>
        </>
    )
}