/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react';
import { Option, Product, Variant } from '../../../util/cookies/cart-cookies';

export const VariantSelect: FC<{ product: Product; variant: Variant; onChange: (val: string) => void }> = ({
    product,
    variant,
    onChange
}) => {
    const defaultValue =
        variant.options.find(option => option.isDefault)?.name ||
        (variant.options.length && variant.options[0].name) ||
        '';

    useEffect(() => {
        onChange(defaultValue);
    }, []);

    return (
        <div className='variant-select'>
            <p>{variant.name}</p>
            <select defaultValue={defaultValue} onChange={e => onChange(e.target.value)}>
                {variant.options.map((option, key) => {
                    return <VariantOption key={key} product={product} option={option} />;
                })}
            </select>
        </div>
    );
};
const VariantOption: FC<{ product: Product; option: Option }> = ({ product, option }) => {
    const priceDiff = (option.price !== null ? option.price : product.price) - product.price;
    const operator = priceDiff === 0 ? '' : priceDiff > 0 ? '+' : '-';
    const priceAdjustmentString =
        option.price !== null && !!operator ? ` (${operator}$${Math.abs(priceDiff).toFixed(2)})` : '';

    return (
        <option value={option.name}>
            {option.name}
            {priceAdjustmentString}
        </option>
    );
};
