import { css } from '@emotion/css';
import { FC, useEffect, useState } from 'react';
import { Product } from '../../util/cookies/cart-cookies';
import { ProductsFilterOption } from './productsFilterOption';

interface ProductsFilterProps {
    products: Product[];
    filter: string | null;
    filterUpdateFn: (filter: string | null) => void;
}

const extractCrystals = (products: Product[]) => {
    const res = new Set<string>();

    products.forEach(product => {
        if (!product.crystals) {
            return;
        }

        product.crystals.forEach(crystal => res.add(crystal));
    });

    return Array.from(res);
};

export const ProductsFilter: FC<ProductsFilterProps> = ({ products, filterUpdateFn, filter }) => {
    const mobile = window.innerWidth < 800;

    const Element = mobile ? ProductsFilterMobile : ProductsFilterDesktop;
    return <Element products={products} filterUpdateFn={filterUpdateFn} filter={filter} />;
};

const ProductsFilterMobile: FC<ProductsFilterProps> = ({ products, filterUpdateFn, filter }) => {
    const crystals = extractCrystals(products);
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (crystal: string) => {
        filterUpdateFn(filter === crystal ? null : crystal);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const dropdown = document.getElementById('dropdown-mobile');
            if (dropdown && !dropdown.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div id='dropdown-mobile' className={dropdown}>
            <button className={dropdownToggle} onClick={() => setIsOpen(!isOpen)}>
                {filter ? filter : 'Filter by crystal type'}
                <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} />
            </button>
            {isOpen && (
                <div className={dropdownMenu}>
                    <button
                        onClick={() => handleOptionClick('')}
                        className={`${menuItem} ${filter === '' && activeItem}`}>
                        All Crystals
                    </button>
                    {crystals.map(crystal => (
                        <button
                            key={crystal}
                            onClick={() => handleOptionClick(crystal)}
                            className={`${menuItem} ${filter === crystal && activeItem}`}>
                            {crystal}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const ProductsFilterDesktop: FC<ProductsFilterProps> = ({ products, filterUpdateFn, filter }) => {
    const crystals = extractCrystals(products);

    return (
        <div className={base}>
            <div className={menu}>
                {crystals.map(crystal => {
                    return (
                        <ProductsFilterOption
                            label={crystal}
                            isActive={filter === crystal}
                            onClick={val => filterUpdateFn(val === filter ? null : val)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const base = css`
    display: block;
    padding: 2rem;
`;

const menu = css`
    display: flex;
    column-gap: 5px;
    row-gap: 5px;
    align-items: center;
    width: 80vw;
    flex-wrap: wrap;
`;

// Mobile

const dropdown = css`
margin: auto;
    width: 80vw;
    position: relative;
    display: inline-block;
`;

const dropdownToggle = css`
    font-size: 0.9rem;
    width: 100%;
    background-color: #f8f9fa;
    border: 1px solid #ced4da;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;

    i {
        margin-left: 5px;
    }
`;

const dropdownMenu = css`
    max-height: 200px;
    overflow-y: scroll;
    z-index: 2;
    width: 100%;
    position: absolute;
    background-color: #ffffff;
    border: 1px solid #ced4da;
    border-radius: 5px;
    padding: 5px 0;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    top: calc(100% + 5px);
    left: 0;

    button {
        font-size: 0.9rem;
    }
`;

const menuItem = css`
    display: block;
    width: 100%;
    padding: 10px 15px;
    background-color: transparent;
    border: none;
    text-align: left;
    cursor: pointer;
`;

const activeItem = css`
    background-color: #007bff;
    color: #ffffff;
`;
