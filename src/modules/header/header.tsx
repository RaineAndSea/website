import { css } from '@emotion/css';
import { useRef, useState } from 'react';
import { MQ } from '../../util/mediaQueries';
import { SidePanel } from '../sidePanel/sidePanel';

const headerBase = css`
    width: 100%;
    display: flex;
    height: 135px;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid lightgrey;
    transition: all 300ms;
    background-color: white;
    position: relative;
    top: -20px;

    ${MQ.mobile} {
        position: fixed;
        top: -5px;
        z-index: 3;
    }
`;

const headerBaseSidePanelShowing = css`
    border-bottom: 1px solid transparent;
`;

const logo = css`
    height: 100%;
    width: auto;
    padding-left: 1%;
    position: relative;
    z-index: 6;
`;

const toggleSidePanelButton = css`
    display: flex;
    width: 50px;
    height: 50px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 15%;
    margin-left: 1.5%;
    z-index: 6;

    .line {
        width: 70%;
        height: 2px;
        background-color: black;
        position: relative;
        transition: all 300ms;
        top: 0px;
        left: 0px;
    }

    &:hover {
        cursor: pointer;
    }
`;

const toggleSidePanelButtonShowing = css`
    .line:nth-child(1) {
        transform: rotate(135deg);
        top: 9.5px;
    }
    .line:nth-child(2) {
        transform: scale(0);
    }
    .line:nth-child(3) {
        transform: rotate(-135deg);
        top: -9.5px;
    }
`;

const toggleSidePanelButtonHidden = css`
    ${MQ.laptop} {
        &:hover .line:nth-child(1) {
            left: 7px;
        }

        &:hover .line:nth-child(3) {
            left: -7px;
        }
    }
`;
export const Header = () => {
    const [sidePanelisShowing, setSidePanelIsShowing] = useState(false);
    const sidePanelToggleButtonRef = useRef<HTMLDivElement | null>(null);
    return (
        <div className={`${headerBase} ${sidePanelisShowing && headerBaseSidePanelShowing}`}>
            <div
                ref={sidePanelToggleButtonRef}
                onClick={() => setSidePanelIsShowing(!sidePanelisShowing)}
                className={`${toggleSidePanelButton} ${sidePanelisShowing ? toggleSidePanelButtonShowing : toggleSidePanelButtonHidden}`}>
                <div className='line' />
                <div className='line' />
                <div className='line' />
            </div>
            <img
                className={logo}
                alt='raine_and_sea_logo'
                src='https://i.etsystatic.com/isla/29c813/52642632/isla_500x500.52642632_11lyy4w2.jpg?version=0'
            />
            {sidePanelisShowing && (
                <SidePanel
                    closeSidePanel={() => setSidePanelIsShowing(false)}
                    sidePanelToggleButton={sidePanelToggleButtonRef}
                />
            )}
        </div>
    );
};
