import * as React from "react";

import { connect } from "react-redux";

import { BigNumber } from "bignumber.js";

import { DebtEntity } from "../../models";
import { Dharma } from "@dharmaprotocol/dharma.js";

import { amortizationUnitToFrequency } from "../../utils";

import { TokenAmount } from "src/components";

interface Props {
    dharma: Dharma;
    order: DebtEntity;
}

interface State {
    collateralTokenDecimals: BigNumber;
    principalTokenDecimals: BigNumber;
}

class DebtOrder extends React.Component<Props, State> {
    state = {
        collateralTokenDecimals: new BigNumber(0),
        principalTokenDecimals: new BigNumber(0),
    };

    componentDidMount() {
        if (this.props.dharma) {
            this.retrieveTokenDecimals();
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.dharma !== prevProps.dharma) {
            this.retrieveTokenDecimals();
        }
    }

    async retrieveTokenDecimals() {
        const { order, dharma } = this.props;

        const collateralTokenSymbol = order.collateralTokenSymbol;
        const collateralTokenDecimals = await dharma.token.getNumDecimals(collateralTokenSymbol);

        const principalTokenSymbol = order.principalTokenSymbol;
        const principalTokenDecimals = await dharma.token.getNumDecimals(principalTokenSymbol);

        this.setState({ collateralTokenDecimals, principalTokenDecimals });
    }

    /**
     * HACK fast hack to show total repayment
     * TODO move calculation to model
     */
    calcTotalRepayment(amount: BigNumber, percent: BigNumber): BigNumber {
        if (!(amount instanceof BigNumber)) {
            amount = new BigNumber(amount);
        }

        if (!(percent instanceof BigNumber)) {
            percent = new BigNumber(percent);
        }

        const repayment = amount.toNumber() + amount.toNumber() * (percent.toNumber() / 100);

        return new BigNumber(repayment);
    }

    render() {
        const { order } = this.props;

        if (!order) {
            return null;
        }

        const totalRepayment = this.calcTotalRepayment(order.principalAmount, order.interestRate);

        return (
            <tr key={order.id}>
                <td>{order.createdAt}</td>
                <td>
                    <TokenAmount
                        tokenAmount={order.principalAmount}
                        tokenDecimals={this.state.principalTokenDecimals}
                        tokenSymbol={order.principalTokenSymbol}
                    />
                </td>
                <td>
                    {order.termLength} {order.amortizationUnit}
                </td>
                <td>
                    <TokenAmount
                        tokenAmount={totalRepayment}
                        tokenDecimals={this.state.principalTokenDecimals}
                        tokenSymbol={order.principalTokenSymbol}
                    />
                </td>
                <td>{order.interestRate}%</td>
                <td>
                    <TokenAmount
                        tokenAmount={order.collateralAmount}
                        tokenDecimals={this.state.collateralTokenDecimals}
                        tokenSymbol={order.collateralTokenSymbol}
                    />
                </td>
                <td />
                <td>{amortizationUnitToFrequency(order.amortizationUnit)}</td>
                <td />
            </tr>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dharma: state.dharmaReducer.dharma,
});

export default connect(mapStateToProps)(DebtOrder);
