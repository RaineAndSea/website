import { css } from '@emotion/css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_QUERY } from '../../App';
import { Product } from '../../util/cookies/cart-cookies';
import { MQ } from '../../util/mediaQueries';
import { ProductCard } from './productCard';
import { ProductsFilter } from './productsFilter';

const container = css`
    padding: 5%;
    position: relative;
    column-gap: 3%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    row-gap: 4vh;
    margin: auto;
    padding-bottom: 100px;
    overflow-y: scroll;

    ${MQ.laptop} {
        max-height: 70%;
    }
    ${MQ.mobile} {
        justify-content: flex-start;
        top: 20%;
        row-gap: 15px;
    }
`;
export const Products = () => {
    const [productsByCategory, setProductsByCategory] = useState<Product[]>([]);
    const [productsByFilter, setProductsByFilter] = useState<Product[]>([]);
    const { productCategory } = useParams();
    const [filter, setFilter] = useState<string | null>(null);

    useEffect(() => {
        setFilter(null);
    }, [productCategory]);

    useEffect(() => {
        const categoryEndpoint = productCategory ? `products/category/${productCategory}` : `products`;
        const filterEndpoint = productCategory
            ? `products/category/${productCategory}?crystal=${filter}`
            : `products?crystal=${filter}`;

        axios
            .get(`${BASE_QUERY}/${categoryEndpoint}`)
            .then(res => {
                setProductsByCategory(res.data || []);
            })
            .catch(err => console.log(err));

        axios
            .get(`${BASE_QUERY}/${filterEndpoint}`)
            .then(res => {
                setProductsByFilter(res.data || []);
            })
            .catch(err => console.log(err));
    }, [productCategory, filter]);

    return (
        <div className={container}>
            <ProductsFilter products={productsByCategory} filterUpdateFn={val => setFilter(val)} filter={filter} />
            {productsByFilter?.map(prod => <ProductCard product={prod} />)}
        </div>
    );
};
