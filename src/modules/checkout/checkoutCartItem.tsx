import { css } from '@emotion/css';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { BASE_QUERY } from '../../App';
import { Product } from '../../util/cookies/cart-cookies';
import { depth } from '../../util/depth';
import { MQ } from '../../util/mediaQueries';

export function formatToUSD(price: number) {
    return Number(price).toFixed(2);
}
export function truncateText(text: string, len?: number) {
    if (text.length <= (len || 75)) {
        return text;
    }

    let truncated = text.substring(0, len || 75);

    // Check if the truncated text ends with a non-alphanumeric character
    while (!/\w$/.test(truncated)) {
        truncated = truncated.slice(0, -1);
    }

    return truncated + '...';
}

const base = css`
    width: 100%;
    border-bottom: 1px solid lightgrey;
    display: flex;
    align-items: center;
    padding: 10px 0;

    img {
        height: 150px;
        width: auto;
        margin-left: 5%;
        border-radius: 15px;
        box-shadow: ${depth[1]};

        ${MQ.mobile} {
            border-radius: 5px;
            height: 70px;
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
            color: rgb(20, 120, 20);
        }

        .description {
            flex-grow: 1;
            overflow-x: wrap;
        }
    }

    .product-qty {
        width: 30%;
    }
`;

export const error404Product: Product = {
    _id: '',
    title: 'Error',
    price: 0,
    description: 'Error',
    imgUrl: 'none',
    type: '',
    category: '',
    crystals: []
};
export const CheckoutCartItem: FC<{ productId: string; qty?: number }> = ({ productId, qty = 1 }) => {
    const [product, setProduct] = useState<Product>(error404Product);

    useEffect(() => {
        axios
            .get(`${BASE_QUERY}/products/${productId}`)
            .then(res => {
                setProduct(res.data as Product);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={base}>
            <img alt={product.title} src={product.imgUrl} />
            <div className='product-details'>
                <p className='title'>{truncateText(product.title)}</p>
                <p className='price'>${formatToUSD(product.price)}</p>
            </div>
            <p className='product-qty'>{qty}</p>
        </div>
    );
};
