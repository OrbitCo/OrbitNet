import styled from "styled-components";
import { Link } from "react-router";
import { color, fontFamily } from "../../theme";

export const Wrapper = styled.div`
    // background-color: ${color.dharmaGreen};
    background-color: #2bbbad;
    padding-bottom: 20px;
    padding-top: 20px;
    width: inherit;
    position: fixed;
    display:flex;
    z-index: 100;
    height: 100px;
    top: 0px;
    left: 0;
    bottom: 0;
    box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.35);
`;

export const LogoContainer = styled.div`
    // margin: 40px 0 50px;
    flex: 2;
    margin: 0px 30px 0px 30px;
    text-align: center;
`;

export const BrandLogo = styled.img`
    width: 55px;
`;

export const StyledLink = styled(Link)`
    font-family: ${fontFamily.base};
    text-transform: uppercase;
    letter-spacing: 1px;
    flex: 2;
    margin:0px 30px 0px 30px;
    border-radius: 5px;
    text-align: center;
    font-size: 14px;
    color: ${color.white};
    line-height: 25px;
    opacity: 1;
    padding: 20px 25px !important;

    &:hover,
    &.active {
        color: ${color.white};
        background-color: #22968a;
        // border-left: 5px solid ${color.dharmaOrange};
        opacity: 1;
        padding: 20px 25px 20px 20px !important;
    }
`;
