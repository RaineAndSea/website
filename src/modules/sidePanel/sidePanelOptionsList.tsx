import { css } from "@emotion/css"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import cartIcon from '../../static/icons8-cart-24.png'
import listIcon from '../../static/icons8-list-24.png'
import logoutIcon from '../../static/icons8-logout-24.png'
import arrowIcon from '../../static/icons8-right-arrow-50.png'
import { decodeUser, logout } from "../../util/cookies/auth-cookies"
import { getCartSize } from "../../util/cookies/cart-cookies"
import { MQ } from "../../util/mediaQueries"

type Option = {
    label: string,
    icon?: string
}
const options: Option[] = [
    {label: 'Home' }, 
    {label: 'Products', icon: arrowIcon},
    {label: 'Contact'}, 
    {label: 'About me'}
]
const base = css`
    width: 80%;
    padding-right: 20%;
    padding-bottom: 5%;
    margin-top: 170%;
    text-align: left;

    section {
        padding: .1% 0 .1% 10%;
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

    ${MQ.mobile} {
        margin-top: 150%;
        min-height: 20%;
    }
`

const numberIndicator = css`
    background-color: #43c463;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .9em;
    font-weight: bold;
    margin-left: 15px;
    top: 1px;
    position: relative;
`

const numberIndicatorCircle = css`
    width: 18px;
    height: 18px;
    border-radius: 50%;
`

const numberIndicatorRectangle = css`
    width: max-content;
    height: 18px;
    border-radius: 5px;
    padding: 0 5px;
`

const sidePanelUserOption = css`
    .label {
        min-width: 80px;  
    }
`

export const SidePanelOptionsList: FC<{closeSidePanel: () => void}> = ({closeSidePanel}) => {
    const user = decodeUser();
    const navigate = useNavigate();

    const navigateAndClose = (href: string) => {
        navigate(href);
        closeSidePanel();
    }

    return(
         <div className={base}>
            {options.map(({label, icon}, key) => (
                <section 
                key={key} 
                className="side-panel-option-selectable" 
                id={`side-panel-option_${label.replace(/ /g, '-').toLowerCase()}`} 
                onClick={() => navigateAndClose(`${label.replace(/ /g, '-').toLowerCase()}`)}>
                    <p>{label}</p>
                    {icon && <img width={'14px'} style={{position: 'relative', top: '1px', paddingRight: '5px'}} alt="arrow" src={icon} />}
                </section>
            ))}
            <section style={{marginTop: '20px'}}>
                {user && <p>Hi, {user.firstName}</p>}
            </section> 
            {!user && (
                <section 
                className={`${sidePanelUserOption} side-panel-option-selectable`} 
                onClick={() => navigateAndClose('/auth')}>
                    <p className="label">Login</p>
                    <img width={'16px'} style={{position: 'relative', top: '1px', left: '10px' }} alt="arrow" src={logoutIcon} />
                </section> 
            )}
            <section className={`${sidePanelUserOption} side-panel-option-selectable`} onClick={() => navigateAndClose('/checkout')}>
                <p className="label">Checkout</p>
                <img width={'16px'} style={{position: 'relative', top: '1px', left: '10px' }} alt="arrow" src={cartIcon} />
                <div className={`${numberIndicator} ${getCartSize() > 9 ? numberIndicatorRectangle : numberIndicatorCircle}`}>
                    <p>{getCartSize()}</p>
                </div>
            </section>
            {user && (
                <section className={`${sidePanelUserOption} side-panel-option-selectable`}>
                    <p className="label">Wishlist</p>
                    <img width={'16px'} style={{position: 'relative', top: '1px', left: '10px' }} alt="arrow" src={listIcon} />
                </section> 
            )}
            {user && (
                <section className={`${sidePanelUserOption} side-panel-option-selectable`} onClick={() => {
                    logout();
                    window.location.replace('/auth')
                }}>
                    <p className="label">Logout</p>
                    <img width={'16px'} style={{position: 'relative', top: '1px', left: '10px' }} alt="arrow" src={logoutIcon} />
                </section> 
            )}
        </div>
    )
}