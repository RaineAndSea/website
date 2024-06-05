import { css, keyframes } from '@emotion/css';
import { FC, useEffect, useRef } from 'react';
import { MQ } from '../../util/mediaQueries';
import { SidePanelOptionsList } from './sidePanelOptionsList';

export const SidePanel: FC<{
    closeSidePanel: () => void;
    sidePanelToggleButton: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ closeSidePanel, sidePanelToggleButton }) => {
    const panelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const isSidePanel = panelRef.current && panelRef.current.contains(event.target as Node);
            const isSidePanelToggleButton =
                sidePanelToggleButton.current && sidePanelToggleButton.current.contains(event.target as Node);

            if (!isSidePanel && !isSidePanelToggleButton) {
                closeSidePanel();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [panelRef, sidePanelToggleButton, closeSidePanel]);
    return (
        <div className={sidePanel} ref={panelRef}>
            <SidePanelOptionsList closeSidePanel={closeSidePanel} />
        </div>
    );
};

const slideInAnimation = keyframes`
    from {
        left: -400px;
    }
    to {
        left: 0px;
    }
`;
const sidePanel = css`
    top: 0px;
    width: 100%;
    height: 110vh;
    overflow-y: scroll;
    position: absolute;
    display: flex;
    align-items: flex-start;
    z-index: 5;
    left: -400px;
    animation: ${slideInAnimation} 300ms ease forwards;
    box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.1),
        0 8px 16px rgba(0, 0, 0, 0.1);
    background-color: white;
    border-radius: 0 10px 10px 0;

    ${MQ.laptop} {
        width: 400px;
    }
`;
