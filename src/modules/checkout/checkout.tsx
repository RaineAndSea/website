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
    height: 80vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    column-gap: 5%;
    padding: 5% 5%;

    ${MQ.mobile} {
        height: unset;
        margin-top: 20vh;
        column-gap: 0;
        padding: 0;
        width: 100%;
        flex-direction: column;
        align-items: center;
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
    height: 70%;
    padding: 5% 0 0 0;
    overflow-y: scroll;

    ${MQ.mobile} {
        min-height: 40%;
        height: 40vh;
        width: 90%;
        overflow-y: scroll;
        font-size: 0.7em;
    }

    ${MQ.smallMobile} {
        margin-top: 5%;
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
    const mobile = window.innerWidth < 1000;
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
