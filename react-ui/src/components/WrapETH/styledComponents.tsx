import styled from "styled-components";

export const WrapETHButton = styled.div`
    color: #000000;
    cursor: pointer;
    font-size: 10px;
    line-height: 25px;
    opacity: 1;
    padding: 5px 0px;
    text-transform: uppercase;

    @media only screen and (max-width: 823px) {
        font-size: 8px;
        line-height: 14px;
    }
    @media only screen and (max-width: 667px) {
        font-size: 6px;
        line-height: 12px;
    }
    @media only screen and (max-width: 568px) {
        font-size: 6px;
        line-height: 12px;
    }
    @media only screen and (max-width: 480px) {
        font-size: 8px;
        line-height: 10px;
    }
`;
