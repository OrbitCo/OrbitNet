import * as React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as Web3 from "web3";

import { Table } from "reactstrap";
import { DebtEntity } from "../../models";
import { Dharma } from "@dharmaprotocol/dharma.js";

import DebtOrder from "./DebtOrder";

// import { CollateralizedSimpleInterestTermsContractParameters } from "@dharmaprotocol/dharma.js/dist/types/src/adapters/collateralized_simple_interest_loan_adapter";

import { fetchDebts } from "../../actions/debtsActions";

interface Props {
    dharma: Dharma;
    web3: Web3;
    networkId: number;
    debts: DebtEntity[];
    fetchDebts: (networkId: number) => any;
}

class DebtsList extends React.Component<Props> {
    async componentDidMount() {
        if (this.props.networkId) {
            this.props.fetchDebts(this.props.networkId);
        }
    }

    async componentDidUpdate(prevProps: Props) {
        if (this.props.networkId !== prevProps.networkId) {
            this.props.fetchDebts(this.props.networkId);
        }

        if (this.props.dharma) {
            await this.buildDebts(this.props.debts);
        }
    }

    /**
     * TODO Investigate Dharma protocol more thoroughly to determine which fields we
     * have to store in database and which we can retrieve from hashes
     */
    async buildDebts(debts: DebtEntity[]) {
        // const { dharma } = this.props;
        // const debt = debts[0];
        //
        // const adapter = dharma.adapters.collateralizedSimpleInterestLoan;
        //
        // const param = debt.dharmaOrder.termsContractParameters;
        //
        // const unpackedParameters: CollateralizedSimpleInterestTermsContractParameters = adapter.unpackParameters(
        //     param as string
        // );
        //
        // console.log(
        //   unpackedParameters.collateralAmount.toNumber(),
        //   unpackedParameters.principalAmount.toNumber(),
        //   unpackedParameters.collateralTokenIndex.toNumber(),
        //   unpackedParameters.principalTokenIndex.toNumber(),
        //   debt.interestRate
        // );
    }

    render() {
        const { debts } = this.props;

        if (!debts) {
            return null;
        }

        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Created</th>
                            <th>Amount</th>
                            <th>Term</th>
                            <th>Total repayment</th>
                            <th>Interest rate</th>
                            <th>Collateral</th>
                            <th>LTV</th>
                            <th>Repayement frequency</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>{debts.map((debt) => <DebtOrder key={debt.id} order={debt} />)}</tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    debts: state.debtsReducer.debts,
    web3: state.web3Reducer.web3,
    networkId: state.web3Reducer.networkId,
    dharma: state.dharmaReducer.dharma,
});

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            fetchDebts,
        },
        dispatch,
    );

export default connect(mapStateToProps, mapDispatchToProps)(DebtsList);
