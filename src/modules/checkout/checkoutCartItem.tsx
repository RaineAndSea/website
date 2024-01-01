import { css } from "@emotion/css";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { BASE_QUERY } from "../../App";
import trashIcon from '../../static/icons8-trash-32.png';
import { Cart, Product, addToCart, decodeCart, removeFromCart } from "../../util/cookies/cart-cookies";
import { depth } from "../../util/depth";
import { MQ } from "../../util/mediaQueries";

export const isMobile = () => {
    return window.innerWidth < 500;
}
export function formatToUSD(price: number) {
    return Number(price).toFixed(2);
  }
export function truncateText(text: string, len?: number) {
    if (text.length <= (len || 75)) {
      return text;
    }
  
    let truncated = text.substring(0, (len || 75));
  
    // Check if the truncated text ends with a non-alphanumeric character
    while (!/\w$/.test(truncated)) {
      truncated = truncated.slice(0, -1);
    }
  
    return truncated + '...';
  }

const base = css`
    width: 90%;
    border-bottom: 1px solid lightgrey;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;

    section {
        display: flex;
        align-items: center;
    }
    .product-image {
        height: 100px;
        width: auto;
        margin-left: 5%;
        border-radius: 15px;
        box-shadow: ${depth[1]};
        
        ${MQ.mobile} {
            border-radius: 5px;
            height: 80px;
        }
    }
    .product-details {
        width: 70%;
        display: flex;
        margin-left: 5%;
        column-gap: 10%;
        align-items: center;

        .title {
            flex-shrink: 1;
            overflow-x: wrap;
        }

        .price {
            flex-shrink: 0;
            min-width: max-content;
        }

        .description {
            flex-grow: 1;
            overflow-x: wrap;
        }

        ${MQ.mobile} {
            font-size: 1.1em;
        }
    }

    .product-qty {
        width: 30%;
        display: flex;
        justify-content: center;
        p {
            border: 1px solid lightgrey;
            border-radius: 5px;
            padding: 7px;
            height: 10px;
            line-height: 10px;
            font-size: 15px;
        }

        ${MQ.mobile} {
            font-size: 1.1em;
        }

        .minus, .plus {
            width: 15px;
            line-height: 7px;
        }
        
        .minus, .qty {
            border-right: none;
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
        }

        .qty {
            border-right: none;
            border-left: none;
        }

        .plus, .qty {
            border-left: none;
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;
        }

        .delete {
            border-radius: 5px;
            margin-right: 10px;
            width: 19px;
            padding: 2px;
            border: 1px solid lightgrey;
        }
    }

    ${MQ.mobile} {
        padding: 10px 5%;
    }
`

export const error404Product: Product = {
    _id: "",
    title: "Error",
    price: 0,
    description: "Error",
    imgUrl: "none"
}

export const CheckoutCartItem: FC<{productId: string, qty?: number, setCart: (cart: Cart) => void}> = ({productId, qty = 1, setCart}) => {
    const [product, setProduct] = useState<Product>(error404Product);
    const [qtyToDisplay, setQtyToDisplay] = useState(qty);

    const incDec = (productId: string, adding: boolean, purge?: boolean) => {
        if(adding) {
            addToCart(productId, 1);
        } else {
            const inCart = decodeCart().products[productId];
            removeFromCart(productId, (purge && inCart) ? inCart : 1);
        }

        setQtyToDisplay(decodeCart().products[productId]);
        setCart({...decodeCart()});
    }

    useEffect(() => {
        axios.get(`${BASE_QUERY}/products/${productId}`)
        .then(res => {
            console.log(res)
            setProduct(res.data as Product)
        })
        .catch(err => console.log(err));
    }, [productId, qty]);
    
    return(
        <div className={base}>
            <section>
                <img className="product-image" alt={product.title} src={product.imgUrl} />
                <div className="product-details">
                    <p className="title">{truncateText(product.title, isMobile() ? 40 : undefined)}</p>
                    <p className="price">${formatToUSD(product.price * qtyToDisplay)}</p>
                </div>
            </section>
            <section className="product-qty">
                <img onClick={() => incDec(product._id, false, true)} className="delete" alt="delete" src={trashIcon} width={'10px'} />
                <p onClick={() => incDec(product._id, false)} className="minus">-</p>
                <p className="qty">{qtyToDisplay}</p>
                <p onClick={() => incDec(product._id, true)} className="plus">+</p>
            </section>
        </div>
    )
}