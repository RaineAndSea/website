// ProductTitle.tsx
import { FC } from 'react';
import { Title } from '../../../static/styles/styles';

interface ProductTitleProps {
    title: string;
}

export const ProductTitle: FC<ProductTitleProps> = ({ title }) => {
    return <Title>{title}</Title>;
};
