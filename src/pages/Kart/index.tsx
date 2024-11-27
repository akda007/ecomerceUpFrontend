/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Grid2 as Grid, Stack, Typography } from "@mui/material";
import Navbar, { navbarHeight } from "../../components/Navbar";
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "./Kart.module.css"

import boletoIcon from "../../assets/boleto-icon.svg"
import pixIcon from "../../assets/pix-icon.svg"
import cardIcon from "../../assets/card-icon.svg"
import { useEffect, useReducer, useState } from "react";
import { api } from "../../axios/api";
import { useAuth } from "../../context/AuthenticationContext";
import { AxiosError } from "axios";
import { toast } from "react-toastify";


type ProductInfo = {
    id: number,
    name: string,
    description: string,
    price: number,
    stock: number
}

type IconButtonProps = {
    image: string,
    value: string,
    toggled: string | null | undefined,
    onSelect: (value: string) => void
}

const IconButton = ({image, value, toggled, onSelect}: IconButtonProps) => {
    return (
    <Button
        variant="outlined"
        value="justify"
        sx={{
            height: "120px",
            aspectRatio: "1/1",
            borderRadius: "15px",
            backgroundColor: `${toggled === value ? "#0f94af5c" : "white"}`,
            boxShadow: "3px 3px 10px 5px #6378eb11"
        }}
        onClick={() => onSelect(value)}
    
    >
        <Stack padding={2}>
            <img
                src={image}
                alt={value}
                style={{
                    objectFit: "cover",
                    width: "100%"
                }}
            />
            <Typography textAlign={"center"}>{value}</Typography>
        </Stack>
    </Button>
    )
}

const FinishPurchase = ({onPurchase}: {onPurchase: (method: string) => void}) => {
    const [value, setValue] = useState<string | null>(null);

    const handleButton = () => {
        onPurchase(value ?? "")
    }

    return (
        <>
            <Stack height={"100%"} padding={5}>

                <Typography variant="h3">Finish Your Purchase!</Typography>

                <Typography variant="h5" mt={10}>Select a Payment Method:</Typography>
                <Stack flexDirection={"row"} justifyContent={"space-between"} mt={2}>
                    <IconButton toggled={value} onSelect={(x) => {setValue(x)}} image={pixIcon} value="PIX" />
                    <IconButton toggled={value} onSelect={(x) => {setValue(x)}} image={boletoIcon} value="BOLETO" />
                    <IconButton toggled={value} onSelect={(x) => {setValue(x)}} image={cardIcon} value="CARD" />
                </Stack>

                <Button variant="contained" sx={{marginTop: "50px"}} onClick={handleButton}>
                    Finish Purchase
                </Button>
            </Stack>
        </>
    )
}


const KartItemList = ({update, forceUpdate}: {update: number, forceUpdate: React.DispatchWithoutAction}) => {
    const [products, setProducts] = useState<ProductInfo[]>([])

    const {token} = useAuth()

    useEffect(() => {
        (async () => {
            const res = await api.get<any>("/kart/products/get", {headers: {Authorization: `Bearer ${token}`}}).catch((err: AxiosError<any>) => {
                toast.error(err.response?.data.message)
            })

            if (!res) return

            setProducts(res.data.map((p:any) => p.product))
        })()
    }, [update])

    const deleteClicked = async (id: number) => {
        const res = await api.post<any>(
            "/kart/products/delete",
            { productId: id, amount: 1},
            {headers: {Authorization: `Bearer ${token}`}})
        .catch((err: AxiosError<any>) => {
            toast.error(err.response?.data.message)
        })

        if (!res) return

        toast.error("Product deleted!")
        forceUpdate()
    }

    return (
        <Stack 
            gap={4} 
            mt={2} 
            height={"90%"} 
            sx={{overflowY: "auto"}}
            className={styles.maskedOverflow}
            py={3}
        >
            {products.map(item => 
                <Stack 
                    justifyContent={"space-between"} 
                    alignItems={"center"}
                    flexDirection={"row"} 
                    position={"relative"}
                    bgcolor={"#D9D9D9"}
                    borderRadius={2}
                    minHeight={"80px"}
                    px={"30px"}
                    py={"5px"}
                    sx={{position: "relative"}}
                >
                    <Typography variant="h5">{item.name}</Typography>
                    <Stack justifyContent={"space-between"} alignItems={"flex-end"}>
                        <div onClick={() => deleteClicked(item.id)}>
                            <DeleteIcon 
                                sx={{
                                    "&:hover": {
                                        fill: 'red'
                                    }
                                }}
                            />
                        </div>
                        <Typography variant="h6" alignSelf={"flex-end"}>${item.price}</Typography>
                    </Stack>                        
                </Stack>            
            )}
        </Stack>
    )
}

export default function Kart() {
    const [update, forceUpdate] = useReducer(x => x + 1, 0);

    const {token} = useAuth()

    const handlePurchase = async (method: string) => {
        const res = await api.post<{message: string}>(
            "/payment",
            {
                method
            },
            {
                headers: {Authorization: `Bearer ${token}`}
            })
        .catch((err: AxiosError<any>) => {
            toast.error(err.response?.data.message ?? err.message)
        })

        if (!res) return

        toast.success(res.data.message)
        forceUpdate()
    }

    return (
        <>
            <Stack height={"100vh"} width={"100vw"}>
                <Navbar/>

                <Grid container flexGrow={1}>
                    <Grid size={7} height={`calc(100vh - ${navbarHeight})`}>
                        <Box width={"100%"} height={"100%"}  maxHeight={"100%"} px={6} py={4}>
                            <Typography variant="h4">Item List</Typography>

                            <KartItemList update={update} forceUpdate={forceUpdate}/>                           

                        </Box>
                    </Grid>
                    <Grid 
                        size={5}
                        sx={{
                            position: "relative",

                            "&::before": {
                                content: '""',
                                backgroundColor: "#119DA4",
                                width: "4px",
                                height: "80%",
                                position: 'absolute',
                                margin: "auto",
                                borderRadius: "15px",
                                top: 0,
                                bottom: 0
                            }
                        }}
                    >
                        <FinishPurchase onPurchase={handlePurchase}/>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
}