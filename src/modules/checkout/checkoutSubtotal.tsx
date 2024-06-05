import { css } from '@emotion/css';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { BASE_QUERY } from '../../App';
import { Cart } from '../../util/cookies/cart-cookies';
import { MQ } from '../../util/mediaQueries';

export const CheckoutSubtotal: FC<{ cart: Cart }> = ({ cart }) => {
    const mobile = window.innerHeight < 800;
    const [subtotal, setSubTotal] = useState(0);
    const qty = Object.values(cart.products).reduce((acc, val) => acc + Number(val), 0);

    console.log(qty);
    useEffect(() => {
        axios
            .post(`${BASE_QUERY}/products/cart-total`, { cart })
            .then(res => setSubTotal(res.data.total))
            .catch(err => console.log(err));
    }, [cart]);

    return (
        <div className={base} style={{ paddingTop: mobile ? '5%' : '1%' }}>
            <p>
                Number of Items: <b>{qty}</b>
            </p>
            <p>
                Subtotal: <b>${subtotal.toFixed(2)}</b>
            </p>
        </div>
    );
};

const base = css`
    height: 15%;
    width: 90%;

    ${MQ.mobile} {
        height: unset;
    }

`;
