import * as React from "react";

import { Wrapper, StyledAlert } from "./styledComponents";

const SystemMessage = () => (
    <Wrapper>
        <StyledAlert color="info" isOpen={true}>
            For testing purposes, please, switch <b>MetaMask</b> to <b>Kovan</b> network and import{" "}
            <b>4c8a694ccbce3e87b91a80cda90cd8dff52cbe269bfbbd4b83bafa7c18042fa7</b> private key.
        </StyledAlert>
    </Wrapper>
);

export default SystemMessage;
