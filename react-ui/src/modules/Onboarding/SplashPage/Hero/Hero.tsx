// External libraries
import * as React from "react";

// Styled components
import {
    Title,
    Slash,
    Wrapper,
    SubTitle,
    Description,
    BlocksBetweenContainer,
    Button,
    HeroContainer,
    HeroDescription,
    HeroImage,
} from "./StyledComponents";

export interface Props {
    // A function that gets invoked when the user agrees to enter the app.
    handleEnterApp: () => void;
}

export default class Hero extends React.Component<Props, {}> {
    render() {
        const { handleEnterApp } = this.props;

        return (
                <HeroContainer>
                    <HeroDescription>
                        <Wrapper>
                            <Title>Orbit Network</Title>
                            <Slash alt="logo" src={require("../../../../assets/img/slash.svg")} />
                        </Wrapper>
                        <SubTitle>Borrow and Lend Cryptoassets</SubTitle>
                        <Description>
                          <h2>  Using Orbit Network, borrowers and lenders can enter into tokenized
                            lending agreements without any intermediaries.</h2>
                        </Description>
                        <BlocksBetweenContainer>
                            <Button onClick={handleEnterApp}>Get Started</Button>
                        </BlocksBetweenContainer>
                    </HeroDescription>

                    <HeroImage>
                        <img src={require("../../../../assets/img/logo_color.png")} />
                    </HeroImage>
                </HeroContainer>
        );
    }
}
