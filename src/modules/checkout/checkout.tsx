import { css } from "@emotion/css"
import { useState } from "react"
import { Product, decodeCart } from "../../util/cookies/cart-cookies"
import { depth } from "../../util/depth"
import { MQ } from "../../util/mediaQueries"
import { CheckoutCartItem } from "./checkoutCartItem"
import { PayPalButton } from "./paypal"

const base = css`
    width: 89.9%;
    height: 70%;
    display: flex;
    justify-content: center;
    column-gap: 5%;
    align-items: center;
    padding: 0 5%;

    ${MQ.mobile} {
        column-gap: 0;
        padding: 0;
        width: 100%;
        flex-direction: column;
    }
`
const checkoutBox = css`
    z-index: 0
    box-shadow: ${depth[1]};
    height: 500px;
    overflow-y: scroll;
    background-color: white;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    width: 50%;
    position: relative;

    ${MQ.mobile} {
        top: 150px;
        height: 50%;
        width: 90%;
        font-size: .7em;
    }
`

const paypalBox = css`
    padding: 30px;
    border-radius: 15px; 
    z-index: 1;
    position: relative;

    ${MQ.laptop} {
        background-color: white;
        box-shadow: ${depth[1]};
        width: 30%;
        max-height: 440px;
        overflow-y: scroll;
    }
    ${MQ.mobile} {
        top: 150px;
        width: 100%;
    }
`
const dummyProduct: Product = {
    _id: 'thing',
    title: 'Protection/Grounding Crystal Bracelet, Grade AAA Onyx and Blue Tigers Eye, Handmade High Quality Crystal bracelet, Stretchy/Comfy, Gift Idea',
    price: 14.97,
    description: 'Onyx and Blue Tigers Eye are both great for protection, grounding, mental strength, clarity, and control over your emotions. \nHandmade high quality bracelet made with 8mm beads and nylon stretchy cord!',
    imgUrl: 'https://i.etsystatic.com/32023127/r/il/25e06a/3593909143/il_1588xN.3593909143_7i1n.jpg'
}
export const Checkout = () => {

    const [cart, setCart] = useState({...decodeCart()});

    return cart ? (
        <div className={base}>
            <div className={checkoutBox}>
                {Object.keys(cart.products).map((id, key) => <CheckoutCartItem key={key} productId={id} qty={cart.products[id as keyof object]} setCart={cart => {
                    setCart({...cart})
        }} />)}
            </div>
            <div className={paypalBox}>
                <PayPalButton />
            </div>
        </div>
    ) : <></>
}