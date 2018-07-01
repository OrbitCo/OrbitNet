// External libraries
import * as React from "react";

// Styled components
import {
    Title,
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
                          <h2>  <Title>Orbit Network</Title></h2>
                        </Wrapper>
                        <SubTitle>P2P Decentralized Lending and Borrowing Platform</SubTitle>
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
