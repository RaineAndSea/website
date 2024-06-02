import { css } from '@emotion/css';
import React from 'react';
import arrowIcon from '../../static/icons8-right-arrow-50.png';

interface MenuItemProps {
    label: string;
    icon?: string;
    iconPosition?: 'left' | 'right';
    mirrorIcon?: boolean;
    isStepThru?: boolean;
    onClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
    label,
    icon,
    iconPosition = 'right',
    mirrorIcon,
    isStepThru,
    onClick
}) => (
    <section className={`side-panel-option-selectable ${isStepThru ? baseStep : ''}`} onClick={onClick}>
        {icon && iconPosition === 'left' && (
            <img
                width={'14px'}
                alt='arrow'
                src={icon}
                style={{ transform: mirrorIcon ? 'scaleX(-1)' : '', marginRight: '6%' }}
            />
        )}
        <p>{label}</p>
        {icon && iconPosition === 'right' && (
            <img width={'14px'} alt='arrow' src={icon} style={{ transform: mirrorIcon ? 'scaleX(-1)' : '' }} />
        )}
        {isStepThru && <img width={'14px'} alt='arrow' src={arrowIcon} />}
    </section>
);

const baseStep = css`
    justify-content: space-between;
`;
