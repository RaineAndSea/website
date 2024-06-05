import { getCookie, setCookie } from './cookies';

export interface Option {
    _id: string;
    name: string;
    price: number | null;
    isDefault: boolean;
}

export interface Variant {
    _id: string;
    name: string;
    options: Option[];
    isGenericForCategory: boolean;
}

export interface Product {
    _id: string;
    title: string;
    price: number;
    description: string;
    imgUrl: string;
    type: string;
    category: string;
    crystals: string[];
    stock: number;
    personalizationHint?: string;
    variants: Variant[];
}
export interface Cart {
    products: { [key: string]: number };
}

const empty = {
    products: {}
};
export const decodeCart = () => {
    if (!getCookie('cart')) {
        setCookie('cart', JSON.stringify(empty));
    }

    return getCookie('cart') as Cart;
};
export const addToCart = (productId: string, qty?: number) => {
    const cart = decodeCart();

    if (!cart.products[productId]) {
        cart.products[productId] = 0;
    }

    cart.products[productId] += qty || 1;

    setCookie('cart', JSON.stringify(cart));
};

export const removeFromCart = (productId: string, qty?: number) => {
    const cart = decodeCart();

    if (!cart.products[productId]) {
        return;
    }

    cart.products[productId] -= qty || 1;
    if (cart.products[productId] <= 0) {
        delete cart.products[productId];
    }

    setCookie('cart', JSON.stringify(cart));
};

export const getCartSize = () => {
    const cart = decodeCart();

    return Object.values(cart.products).reduce((a, b) => a + b, 0);
};
