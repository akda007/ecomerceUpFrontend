import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type ProductViewProps = {
    id: number
    name: string
    price: number
    stock: number
    description: string
    onClick: (id: number) => void
}

export default function ProductView({id, name, description, price, stock, onClick}: ProductViewProps) {
    return (
        <Stack 
            bgcolor={"#D9D9D9"}
            padding={2}
            borderRadius={4}
            boxShadow={"3px 3px 10px 0px #0000007b"}
            position={"relative"}
        >
            

            <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} mb={2}>
                <Stack flexDirection={"row"} gap={"5px"} alignItems={"center"}>
                    <Typography variant="h5">{name}</Typography>
                    <Link to={`/edit-product?id=${id}&name=${name}&price=${price}&stock=${stock}&description=${description}`}>
                        <span className="material-symbols-outlined">edit</span>
                    </Link>
                </Stack>
                
                
                <Typography>Stock: {stock}</Typography>
            </Stack>

            <Typography>{description}</Typography>

            <Stack mt={3} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} gap={4}>
                <Typography>${price.toFixed(2)}</Typography>
                <Button variant="outlined" onClick={() => onClick(id)}>Add to Kart</Button>
            </Stack>

        </Stack>
    )
}