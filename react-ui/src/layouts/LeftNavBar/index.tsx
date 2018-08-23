import * as React from "react";
import { Wrapper } from "./styledComponents";
import { TradingPermissionsContainer } from "../../components";

interface Props {
    handleCloseDrawer: () => void;
}

class LeftNavBar extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.closeDrawer = this.closeDrawer.bind(this);
    }

    closeDrawer() {
        const { handleCloseDrawer } = this.props;
        handleCloseDrawer();
    }

    render() {
        return (
            <Wrapper>
                <TradingPermissionsContainer className="TradingPermissionsContainer left" />
            </Wrapper>
        );
    }
}

export default LeftNavBar;
