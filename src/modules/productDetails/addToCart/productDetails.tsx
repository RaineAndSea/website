import { css } from '@emotion/css';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_QUERY } from '../../../App';
import { Product } from '../../../util/cookies/cart-cookies';
import { MQ } from '../../../util/mediaQueries';
import { ImageGallery } from '../imageGallery';
import { AddToCartSection } from './addToCartSection';

interface ProductProps {
    // product: productId;
}
export const ProductDetails: FC<ProductProps> = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product | undefined>();

    useEffect(() => {
        axios
            .get(`${BASE_QUERY}/products/${productId}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err));
    }, [productId]);

    if (!product) {
        return <></>;
    }
    return (
        <div className={base}>
            {/* image and adding to cart */}
            <div className={top}>
                <ImageGallery product={product} />
                <AddToCartSection product={product} />
            </div>

            {/* details and description */}
            <div className={bottom}></div>
        </div>
    );
};

const base = css`
    position: relative;
    margin: auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 5rem;

    ${MQ.mobile} {
        width: 90%;
        top: 10rem;
    }
`;

const top = css`
    height: 65vh;
    display: flex;
    column-gap: 2rem;

    ${MQ.mobile} {
        width: 100%;
        flex-wrap: wrap;
        height: unset;

        .image-gallery,
        .addToCartSection {
            width: 100%;
        }
    }
`;
const bottom = css`
    width: 100%;
    height: 200px;
    // border: 1px solid blue;
`;
