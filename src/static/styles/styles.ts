// styles.ts
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { depth } from "../../util/depth";
import { MQ } from "../../util/mediaQueries";

export const Title = styled.p`
    margin: .5rem 0;
    font-weight: bold;

    ${MQ.mobile} {
        font-size: .8rem;
    }
`;

export const PriceAndAddToCartWrapper = styled.section`
    padding: 1rem 0;
    display: flex;
    align-items: center;
    column-gap: 1rem;
    width: 100%;

    ${MQ.mobile} {
        align-items: flex-start;
        column-gap: .5rem;
    }
`;

export const AddToCartButton = styled.section`
    display: flex;
    width: 30%;
    justify-content: center;
    align-items: center;
    padding: 0;
    border-radius: 10px;
    background-color: #f0f0f0;
    cursor: pointer;
    border: 1px solid #d8d8d8;
    height: 100%;

    img {
        width: 1.1rem;
        margin-left: .6rem;
    }

    ${MQ.mobile} {
        height: 96%;
        width: max-content;
        flex-grow: 1;
        padding: 0 1rem;
        font-size: .8rem;
    }
`;

export const Price = styled.p`
    margin: .5rem 0;
    font-weight: bold;
    font-size: 1.5rem;

    ${MQ.mobile} {
        font-size: 1.2rem;
    }
`;

export const TagsWrapper = styled.ul`
    display: flex;
    gap: 1rem;
    list-style: none;
    padding: 1rem 0 1rem 0;
    margin: 0;
    width: 100% !important;
    flex-wrap: wrap;

    ${MQ.mobile} {
        gap: .5rem;
        padding: 1rem 0 0 0;
    }
`;

export const Tag = styled.li`
    font-size: .8rem;
    padding: .5rem;
    border-radius: 10px;
    background-color: #f0f0f0;
    flex-grow: 1; 
    text-align: center;

    ${MQ.mobile} {
        background-color: white;
    }
`;

export const AddToCartWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    gap: 1rem;
    width: 50%;
    padding: 1%;
    border-radius: 10px;
    overflow-x: hidden;

    ${MQ.mobile} {
        width: 100%;
        top: 2rem;
    }

    ${MQ.laptop} {
        background-color: white;
        box-shadow: ${depth[1]};
        overflow-y: scroll;
    }
`;

export const PrimaryDetails = styled.section`
    padding: 3rem 0 0 0;
    width: 80%;
    display: flex;
    flex-direction: column;
    position: relative;

    ${MQ.mobile} {
        width: 90%;
        padding: 0;
    }
`;

export const dropdownWrapper = css`
    position: relative;
    width: 3rem;
    height: 100%;
`;

export const dropdownHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 96%;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    background-color: #fff;
    padding: 0 0.5rem;
`;

export const dropdownList = css`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    z-index: 1000;
    max-height: 150px;
    overflow-y: auto;
    margin-top: 0.5rem;
    padding: 0;
    list-style: none;
`;

export const dropdownListItem = css`
    padding: 0.5rem;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

export const DropdownWrapper = styled.div`
    position: relative;
    width: 3rem;
    height: 100%;
`;

export const DropdownHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 96%;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    background-color: #fff;
    padding: 0 0.5rem;
`;

export const OptionsContainer = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    z-index: 1000;
    box-shadow: ${depth[2]};
    max-height: 150px;
    overflow-y: auto;
    margin-top: 0.5rem;
    padding: 0;
`;

export const OptionStyle = styled.div`
    padding: 0.5rem;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;
