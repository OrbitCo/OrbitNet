// External libraries
import * as React from "react";

interface Props {}

export class RequestLoanDescription extends React.Component<Props, {}> {
    render() {
        return (
            <div>
                <p>
                    Please use this form generate an <b>Open Debt Order</b>; a
                  You can propose the commitment terms below.
                </p>
                <p>
                    Generating an <b>Open Debt Order</b> is <i>entirely</i> free, but you will be
                    prompted to digitally sign your commitment.
                </p>
            </div>
        );
    }
}
