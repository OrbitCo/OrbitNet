import styled from "styled-components";
import { StyledButton } from "../StyledComponents";

export const TradingPermissionsWrapper = styled.div`
    width: inherit;

    &.left {
        position: fixed;
        // bottom: 10px;
        padding-left: 25px;
    }
`;

export const TradingPermissionsTitle = styled.div`
    color: #000000;
    font-size: 18px;
    margin-bottom: 30px;
    line-height: 25px;
    // opacity: 0.5;
    padding: 5px 0px;
    text-transform: uppercase;
`;

export const TokenSearchResults = styled.div`
    min-height: 176px;
    border: 1px solid black;
    padding: 10px;
`;

export const TokenSymbol = styled.div`
    display: inline-block;
    min-width: 40px;
    padding-right: 5px;
    // opacity: 0.5;
`;

export const TokenBalance = styled.div`
    display: inline-block;
    // opacity: 0.5;
`;

export const NoTokenResults = styled.div`
    color: #000000;
    // opacity: 0.5;
`;

export const FaucetButton = StyledButton.extend`
    margin-left: 5px;
    display: inline-block;
    font-size: 10px !important;
    padding: 10px 15px !important;
    min-width: auto !important;
    line-height: 4px !important;
`;

export const ShowMoreButton = TradingPermissionsTitle.extend`
    cursor: pointer;
`;

export const Arrow = styled.img`
    width: 10px;
`;

export const LoaderContainer = styled.div`
    display: inline-block;
    margin-left: 10px;
`;
