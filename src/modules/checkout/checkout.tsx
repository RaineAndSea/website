import { css } from '@emotion/css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_QUERY } from '../../App';
import { decodeCart } from '../../util/cookies/cart-cookies';
import { depth } from '../../util/depth';
import { MQ } from '../../util/mediaQueries';
import { CheckoutBox } from './checkoutBox';
import { CheckoutSubtotal } from './checkoutSubtotal';
import { EmptyCheckoutBox } from './emptyCheckoutBox';
import { PayPalButton } from './paypal';

const base = css`
    width: 89.9%;
    height: 80%;
    display: flex;
    justify-content: center;
    column-gap: 5%;
    align-items: center;
    padding: 0 5%;

    ${MQ.mobile} {
        margin-top: 20%;
        height: 100%;
        column-gap: 0;
        padding: 0;
        width: 100%;
        flex-direction: column;
    }
`;
const checkoutBox = css`
    z-index: 0;
    box-shadow: ${depth[1]};
    background-color: white;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    max-height: 100%;
    min-height: 60%;
    overflow-y: scroll;

    ${MQ.mobile} {
        min-height: 40%;
        height: 40%;
        width: 90%;
        font-size: 0.7em;
    }
`;

const paypalBox = css`
    padding: 30px;
    border-radius: 15px;
    z-index: 1;

    ${MQ.laptop} {
        background-color: white;
        box-shadow: ${depth[1]};
        width: 30%;
        max-height: 440px;
        overflow-y: scroll;
    }
    ${MQ.mobile} {
        width: 113%;
    }
`;
export const Checkout = () => {
    const [cart, setCart] = useState(decodeCart());
    const [total, setTotal] = useState<number>(0);
    const mobile = window.innerWidth < 800;
    console.log({
        env: process.env
    });
    const { REACT_APP_PAYPAL_CLIENT_ID } = process.env;
    useEffect(() => {
        axios
            .post(`${BASE_QUERY}/products/cart-total`, { cart })
            .then(res => setTotal(res.data.total))
            .catch(err => console.log(err));
    }, [cart]);

    const cartIsEmpty =
        Object.values(cart.products).length === 0 || Object.values(cart.products).every(val => val <= 0);
    return (
        <div className={base}>
            <div className={checkoutBox}>
                {!cartIsEmpty && <CheckoutBox cart={cart} cartUpdateFn={cart => setCart(cart)} />}
                {cartIsEmpty && <EmptyCheckoutBox />}
            </div>
            {mobile && <CheckoutSubtotal cart={cart} />}
            <div className={paypalBox}>
                <PayPalButton PPCID={REACT_APP_PAYPAL_CLIENT_ID} />
            </div>
        </div>
    );
};
