// External libraries
import * as React from "react";

interface Props {}

export class RequestLoanDescription extends React.Component<Props, {}> {
    render() {
        return (
            <div>
                <p>
                    Please use this form generate an <b>Open Debt Order</b>. You can propose Loan
                    Terms below. The Loan request will be posted at the Board for Lenders
                </p>
                <p>
                    Generating an <b>Open Debt Order</b> is <i>entirely</i> free, but you will be
                    prompted to digitally sign your commitment.
                </p>
            </div>
        );
    }
}
