import { css } from '@emotion/css';
import { FC } from 'react';
import toast from 'react-hot-toast';
import cartIcon from '../../static/icons8-cart-24.png';
import { Product, addToCart } from '../../util/cookies/cart-cookies';
import { depth } from '../../util/depth';
import { MQ } from '../../util/mediaQueries';
import { regLoginSubmitButton } from '../auth/login';
import { formatToUSD, truncateText } from '../checkout/checkoutCartItem';

const base = css`
    width: 20%;
    min-width: 359px;
    height: 475px;
    max-width: 22.8%;
    flex-grow: 1;
    background-color: white;
    border-radius: 15px;
    box-shadow: ${depth[1]};

    .img {
        width: 100%;
        height: 70%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 15px 15px 0 0;
        background-position-y: center;
    }

    .details {
        display: flex;
        flex-direction: column;
        padding: 2% 5%;
        justify-content: center;

        .title {
            font-size: 0.9em;
            overflow-x: scroll;
            max-width: 100%;
        }

        section {
            display: flex;
            justify-content: center;
            align-items: center;
            column-gap: 5%;

            .price {
                font-weight: bold;
            }
        }

        .freeShipping {
            color: #0c7a5b;
            background-color: #ebfdf8;
            padding: 2.1%;
            font-size: 0.8em;
            width: max-content;
            border: 1px solid #0c7a5b;
        }

        .addToCartButton {
            font-size: 0.8em;
            padding: 0px 15px;
            width: max-content;
            height: 35px;

            p {
                min-width: max-content;
            }
            img {
                position: relative;
                top: 1px;
                margin-left: 5px;
            }
        }
    }

    ${MQ.mobile} {
        width: 100%;
    }
`;

const addToCartWithConfirmation = (id: string) => {
    toast.success('Item added to cart');
    addToCart(id);
};
export const ProductCard: FC<{ product: Product }> = ({ product }) => {
    return (
        <div className={base}>
            <section className='img' style={{ backgroundImage: `url(${product.imgUrl})` }} />
            <section className='details'>
                <p className='title'>{truncateText(product.title, 80)}</p>
                <section>
                    <p className='price'>${formatToUSD(product.price)}</p>
                    <section
                        className={`${regLoginSubmitButton} addToCartButton`}
                        onClick={() => addToCartWithConfirmation(product._id)}>
                        <p>Add to cart</p>
                        <img src={cartIcon} width={'12px'} />
                    </section>
                    <p className='freeShipping'>FREE shipping</p>
                </section>
            </section>
        </div>
    );
};
