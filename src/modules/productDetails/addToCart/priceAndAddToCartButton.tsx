// PriceAndAddToCartButton.tsx
import { FC } from 'react';
import toast from 'react-hot-toast';
import { Product, addToCart } from '../../..//util/cookies/cart-cookies';
import cartIcon from '../../../static/icons8-cart-24.png';
import { AddToCartButton, Price, PriceAndAddToCartWrapper } from '../../../static/styles/styles';
import { CustomDropdown } from './customDropdown';

interface PriceAndAddToCartButtonProps {
    product: Product;
    price: number;
    quantity: number;
    setQuantity: (quantity: number) => void;
}

export const PriceAndAddToCartButton: FC<PriceAndAddToCartButtonProps> = ({
    product,
    price,
    quantity,
    setQuantity
}) => {
    const handleAddToCartClick = () => {
        addToCart(product._id, quantity);
        toast.success('Added to cart');
    };

    return (
        <PriceAndAddToCartWrapper>
            <Price>${price.toFixed(2)}</Price>
            <CustomDropdown
                options={Array.from({ length: 10 }, (_, i) => i + 1)}
                defaultValue={1}
                onChange={setQuantity}
            />
            <AddToCartButton onClick={handleAddToCartClick}>
                <p>Add to cart</p>
                <img src={cartIcon} width={'12px'} />
            </AddToCartButton>
        </PriceAndAddToCartWrapper>
    );
};
