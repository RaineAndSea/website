import axios from "axios";
import { FC, useEffect, useState } from "react";
import { BASE_QUERY } from "../../App";
import { Product, Variant } from "../../util/cookies/cart-cookies";

interface AddToCartSectionProps {
    product: Product;
}
export const AddToCartSection: FC<AddToCartSectionProps> = ({product}) => {
    const [variants, setVariants] = useState<Variant[]>([]);

    useEffect(() => {
        axios.get(`${BASE_QUERY}/variants/byCategory?category=${product.category}`)
        .then(res => setVariants(res.data))
        .catch(err => console.log(err))
    }, [product.category]);

    return(
        <div className="addToCartSection">
            {JSON.stringify(variants)}
        </div>
    )
}