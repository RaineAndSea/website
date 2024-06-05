import { FC } from 'react';
import { Cart } from '../../util/cookies/cart-cookies';
import { CheckoutCartItem } from './checkoutCartItem';
import { CheckoutSubtotal } from './checkoutSubtotal';

interface CheckoutBoxProps {
    cart: Cart;
    cartUpdateFn: (cart: Cart) => void;
}
export const CheckoutBox: FC<CheckoutBoxProps> = ({ cart, cartUpdateFn }) => {
    const mobile = window.innerWidth < 1000;
    return (
        <>
            <section style={{ width: '100%', height:'100%', overflowY: 'scroll' }}>
                {Object.keys(cart.products).map((id, key) => (
                    <CheckoutCartItem
                        key={key}
                        productId={id}
                        qty={cart.products[id as keyof object]}
                        setCart={cart => cartUpdateFn(cart)}
                        isLast={key === Object.keys(cart.products).length - 1}
                    />
                ))}
            </section>
            {!mobile && (
                <>
                    <div style={{ width: '100%', height: '3px', backgroundColor: 'darkgrey' }} />
                    <CheckoutSubtotal cart={cart} />
                    <div style={{ width: '100%', height: '30px' }} />
                </>
            )}
        </>
    );
};
