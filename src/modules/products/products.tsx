import { css } from "@emotion/css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_QUERY } from "../../App";
import { Product } from "../../util/cookies/cart-cookies";
import { MQ } from "../../util/mediaQueries";
import { ProductCard } from "./productCard";

const container = css`
    padding: 5%;
    position: relative;
    column-gap: 3%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    row-gap: 4vh;
    margin: auto;
    padding-bottom: 100px;
    overflow-y: scroll;

    ${MQ.laptop} {
        max-height: 70%;
    }
    ${MQ.mobile} {
        padding: 5% 0;
        padding-bottom: 300px;
        top: 20%;
        width: 100%;
        justify-content: center;
        row-gap: 15px;
    }
`
export const Products = () => {
    const [products, setProducts] = useState<Product[] | null>();

    useEffect(() => {
        axios.get(`${BASE_QUERY}/products`)
        .then(res => {
            setProducts(res.data || []);
        })
        .catch(err => console.log(err))
    }, [])
    

    return(
        <div className={container}>
                {products?.map(prod => <ProductCard product={prod} />)}
        </div>
    )
}