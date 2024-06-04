// AddToCartSection.tsx
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { BASE_QUERY } from '../../../App';
import { AddToCartWrapper, PrimaryDetails } from '../../../static/styles/styles';
import { Product, Variant } from '../../../util/cookies/cart-cookies';
import { PriceAndAddToCartButton } from './priceAndAddToCartButton';
import { ProductTitle } from './productTitle';
import { Tags } from './tags';
import { VariantsSection } from './variantsSection';

interface AddToCartSectionProps {
    product: Product;
}

export const AddToCartSection: FC<AddToCartSectionProps> = ({ product }) => {
    const [variants, setVariants] = useState<Variant[]>([]);
    const [variantValues, setVariantValues] = useState<{ [key: string]: string }>({});
    const [price, setPrice] = useState(product.price);
    const [priceIncreasedDueToVariant, setPriceIncreasedDueToVariant] = useState(false);
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        const totalVariants: Variant[] = [...(product.variants || [])];
        axios
            .get(`${BASE_QUERY}/variants/byCategory?category=${product.category}`)
            .then(res => setVariants([...totalVariants, ...res.data]))
            .catch(err => console.log(err));
    }, [product.category, product.variants]);

    useEffect(() => {
        let newPrice = product.price;
        for (const [key, value] of Object.entries(variantValues)) {
            const variant = variants.find(v => v.name === key);
            if (variant) {
                const option = variant.options.find(o => o.name === value);
                if (option && option.price) {
                    newPrice += option.price - product.price;
                }
            }
        }
        setPriceIncreasedDueToVariant(newPrice > product.price);
        setPrice(newPrice);
    }, [product.price, variantValues, variants]);

    return (
        <AddToCartWrapper>
            <PrimaryDetails>
                <ProductTitle title={product.title} />
                <PriceAndAddToCartButton
                    product={product}
                    price={price}
                    quantity={quantity}
                    setQuantity={setQuantity}
                />
                <Tags tags={['Handmade to order', 'Genuine crystals', 'Free shipping', '30 day return policy']} />
            </PrimaryDetails>
            <VariantsSection
                product={product}
                variants={variants}
                onChange={setVariantValues}
                variantValues={variantValues}
            />
        </AddToCartWrapper>
    );
};
