import { css } from '@emotion/css';
import React from 'react';
import { APP_BASE_QUERY } from '../../App';
import cartIcon from '../../static/icons8-cart-24.png';
import listIcon from '../../static/icons8-list-24.png';
import logoutIcon from '../../static/icons8-logout-24.png';
import { logout } from '../../util/cookies/auth-cookies';
import { getCartSize } from '../../util/cookies/cart-cookies';
import { regLoginHyperlink } from '../auth/login';

interface UserSectionProps {
    user?: any;
    navigate: (href: string) => void;
}

export const UserSection: React.FC<UserSectionProps> = ({ user, navigate }) => {
    if (!user) {
        user = { firstName: 'stranger' };
    }

    return (
        <>
            <section style={{ marginTop: '20px', display: 'flex' }}>
                <p className={regLoginHyperlink} style={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
                    Hi, {user.firstName}
                    {user.firstName === 'stranger' && (
                        <span onClick={() => window.location.replace(APP_BASE_QUERY + '/auth')}>
                            ..
                            <span className='decorated' style={{ marginLeft: '1rem' }}>
                                let's fix that
                            </span>
                        </span>
                    )}
                </p>
            </section>
            <section
                className={`${sidePanelUserOption} side-panel-option-selectable`}
                onClick={() => navigate(APP_BASE_QUERY + '/checkout')}>
                <p className='label'>Checkout</p>
                <img width={'16px'} alt='arrow' src={cartIcon} />
                <div
                    className={`${numberIndicator} ${getCartSize() > 9 ? numberIndicatorRectangle : numberIndicatorCircle}`}>
                    <p>{getCartSize()}</p>
                </div>
            </section>
            {user.firstName !== 'stranger' && (
                <section className={`${sidePanelUserOption} side-panel-option-selectable`}>
                    <p className='label'>Wishlist</p>
                    <img width={'16px'} alt='arrow' src={listIcon} />
                </section>
            )}
            {user.firstName !== 'stranger' && (
                <section
                    className={`${sidePanelUserOption} side-panel-option-selectable`}
                    onClick={() => {
                        logout();
                        window.location.replace(APP_BASE_QUERY + '/auth');
                    }}>
                    <p className='label'>Logout</p>
                    <img width={'16px'} alt='arrow' src={logoutIcon} />
                </section>
            )}
        </>
    );
};

const numberIndicator = css`
    background-color: #43c463;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.9em;
    font-weight: bold;
    margin-left: 15px;
    top: 1px;
    position: relative;
`;

const numberIndicatorCircle = css`
    width: 18px;
    height: 18px;
    border-radius: 50%;
`;

const numberIndicatorRectangle = css`
    width: max-content;
    height: 18px;
    border-radius: 5px;
    padding: 0 5px;
`;

const sidePanelUserOption = css`
    .label {
        min-width: 80px;
    }

    &:hover {
        background-image: linear-gradient(to bottom right, #adf4f9, #fef1fe);
        background-color: #d8f7fa;
        cursor: pointer;
    }
`;
