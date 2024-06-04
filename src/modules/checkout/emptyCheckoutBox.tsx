import { css } from '@emotion/css';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import empty from '../../static/icons8-empty-100.png';
import { MQ } from '../../util/mediaQueries';
import { regLoginHyperlink } from '../auth/login';

export const EmptyCheckoutBox: FC = () => {
    const navigate = useNavigate();
    return (
        <div className={base}>
            <img src={empty} alt={'empty state graphic'} />
            <p className={regLoginHyperlink}>
                No items found in your cart! <br /> <br />
                <span className='decorated' onClick={() => navigate('/all-products')}>
                    Let's fix that
                </span>
            </p>
        </div>
    );
};

const base = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
    margin: auto;

    img {
        width: 50%;
    }
    p {
        font-size: 1rem;
    }

    ${MQ.laptop} {
        img {
            width: 60%;
        }
        p {
            font-size: 1.3rem;
        }
    }
`;
