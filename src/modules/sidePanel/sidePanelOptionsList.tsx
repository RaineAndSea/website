import { css } from '@emotion/css';
import { useNavigate } from 'react-router-dom';
import { decodeUser } from '../../util/cookies/auth-cookies';
import { MQ } from '../../util/mediaQueries';
import { PageSection } from './sidePanelPageSection';
import { UserSection } from './sidePanelUserSection';

export const SidePanelOptionsList: React.FC<{ closeSidePanel: () => void }> = ({ closeSidePanel }) => {
    const user = decodeUser();
    const nav = useNavigate();
    const navigate = (href: string) => {
        nav(href);
        if (isMobile) {
            closeSidePanel();
        }
    };
    const isMobile = window.innerWidth <= 800;

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
