import { css } from '@emotion/css';
import { FC } from 'react';
import xIcon from '../../static/icons8-delete-50.png';
import { depth } from '../../util/depth';

interface ProductsFilterOptionProps {
    label: string;
    isActive: boolean;
    onClick: (val: string) => void;
}
export const ProductsFilterOption: FC<ProductsFilterOptionProps> = ({ label, isActive, onClick }) => {
    return (
        <section className={base(isActive)} onClick={() => onClick(label)}>
            {label}
            {isActive && <img src={xIcon} alt='remove filter' className={icon} />}
        </section>
    );
};

const base = (isActive: boolean) => css`
    text-highlight: none;
    position: relative;
    top: 0;
    transition: all 700ms;
    padding: 1rem;
    border: 2px solid;
    border-radius: 100px;
    border-color: ${isActive ? '#2e8445' : 'transparent'};
    background-color: ${isActive ? 'inherit' : 'white'};
    background-image: ${isActive ? 'linear-gradient(to top right, #adf4f9, #fef1fe)' : 'inherit'};
    box-shadow: ${depth[1]};

    &:hover {
        top: -5px;
        cursor: pointer;
        filter: brightness(0.97);
    }

    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;

const icon = css`
    position: relative;
    width: 12px;
    margin-left: 10px;
`;
