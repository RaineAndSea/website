import { css } from '@emotion/css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_QUERY } from '../../App';
import { decodeToken } from '../../util/cookies/auth-cookies';
import { removeCookie } from '../../util/cookies/cookies';
import { MQ } from '../../util/mediaQueries';
import { secureAxios } from '../../util/secureAxios';
import { PageSection } from './sidePanelPageSection';
import { UserSection } from './sidePanelUserSection';

export const SidePanelOptionsList: React.FC<{ closeSidePanel: () => void }> = ({ closeSidePanel }) => {
    const [user, setUser] = useState();

    const nav = useNavigate();
    const navigate = (href: string) => {
        nav(href);
        if (isMobile) {
            closeSidePanel();
        }
    };
    const isMobile = window.innerWidth <= 1000;

    useEffect(() => {
        const decoded = decodeToken();

        if(!decoded.email) {
            removeCookie('csrfToken');
            setUser(undefined);
            return;
        }

        secureAxios.get(`${BASE_QUERY}/users/email/${decoded.email}`)
            .then((res) => {
                console.log(res.data)
                setUser(res.data.user);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [])

    return (
        <div className={base}>
            <PageSection navigate={navigate} />
            <UserSection user={user} navigate={navigate} />
        </div>
    );
};

const base = css`
    width: 80%;
    padding-right: 20%;
    padding-bottom: 5%;
    margin-top: 50%;
    text-align: left;

    section {
        padding: 0.1% 0 0.1% 10%;
        margin-left: 15%;
        transition: all 200ms;
        border-radius: 5px;
        display: flex;
        align-items: center;

        ${MQ.laptop} {
            margin-left: 25%;
        }
    }

    #side-panel-option_products {
        justify-content: space-between;
    }
    .side-panel-option-selectable:hover {
        background-image: linear-gradient(to bottom right, #adf4f9, #fef1fe);
        background-color: #d8f7fa;
        cursor: pointer;
    }

    #side-panel-option_about-me {
        border-bottom: 1px solid lightgrey;

        &:hover {
            border-bottom: 1px solid transparent;
        }
    }
`;
