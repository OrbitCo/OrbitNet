// External Libraries
import * as React from "react";
import * as Web3 from "web3";
import * as _ from "lodash";
import { Dharma } from "@dharmaprotocol/dharma.js";

// Models
import { TokenEntity } from "../../models";

// Styled Components
import { TokenSearchResults, NoTokenResults } from "./styledComponents";

import { TokenSearchResult } from "./TokenSearchResult";
import Icon from "../Icon/Icon";

export interface Props {
    tokens: TokenEntity[];
    web3: Web3;
    networkId: number;
    dharma: Dharma;
    setError: (errorMessage: string) => void;
    clearToast: () => void;
    handleFaucetRequest: (tokenAddress: string, userAddress: string, dharma: Dharma) => void;
    agreeToTerms: boolean;
    updateProxyAllowanceAsync: (tradingPermitted: boolean, tokenAddress: string) => void;
}

interface State {
    query: string;
    results: TokenEntity[];
}

/**
 * The maximum number of search results to display.
 *
 * @type {number}
 */
export const MAX_RESULTS = 4;

/**
 * When no query is present, we show the most popular tokens.
 *
 * @type {string[]}
 */
export const DEFAULT_RESULTS = ["REP", "WETH", "MKR", "ZRX"];

export class TokenSearch extends React.Component<Readonly<Props>, State> {
    state = {
        query: "",
        results: [],
    };

    private search: HTMLInputElement;

    constructor(props: Readonly<Props>) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.setState({ results: this.tokensToDisplay() });
    }

    tokensToDisplay(): TokenEntity[] {
        const { tokens } = this.props;
        const { query } = this.state;

        const lowerCaseQuery = _.lowerCase(query);

        const limitResultsByQuery = (token: TokenEntity): boolean => {
            const { name, symbol } = token;
            const term = _.lowerCase(symbol + name);
            return _.includes(term, lowerCaseQuery);
        };

        const limitResultsToDefault = (token: TokenEntity): boolean => {
            return _.includes(DEFAULT_RESULTS, token.symbol);
        };

        const secondaryComparator = (a: TokenEntity, b: TokenEntity): number => {
            if (a.symbol < b.symbol) {
                return -1;
            }
            if (a.symbol > b.symbol) {
                return 1;
            }
            return 0;
        };

        const primaryComparator = (a: TokenEntity, b: TokenEntity): number => {
            return b.balance.minus(a.balance).toNumber() || secondaryComparator(a, b);
        };

        return tokens
            .filter(query ? limitResultsByQuery : limitResultsToDefault)
            .sort(primaryComparator)
            .slice(0, MAX_RESULTS);
    }

    handleInputChange() {
        this.setState({ query: this.search.value });
    }

    render() {
        const {
            handleFaucetRequest,
            setError,
            clearToast,
            dharma,
            web3,
            agreeToTerms,
            updateProxyAllowanceAsync,
            networkId,
        } = this.props;

        const results = this.tokensToDisplay();

        return (
            <div>
                <form>
                    <Icon icon="search" color="#000000" height="28px" opacity={1} />
                    <input
                        placeholder="Search tokens..."
                        ref={(input: HTMLInputElement) => (this.search = input)}
                        onChange={this.handleInputChange}
                        style={{
                            border: "1px solid black",
                            outline: 0,
                            // backgroundColor: "#082c30",
                            color: "#000000",
                            opacity: 1,
                            margin: "5px 0 5px 14px",
                            width: "calc(100% - 40px)",
                        }}
                    />
                </form>

                <TokenSearchResults>
                    {results.map((token, index) => {
                        return (
                            <TokenSearchResult
                                key={index}
                                token={token}
                                web3={web3}
                                networkId={networkId}
                                dharma={dharma}
                                setError={setError}
                                clearToast={clearToast}
                                handleFaucetRequest={handleFaucetRequest}
                                agreeToTerms={agreeToTerms}
                                updateProxyAllowanceAsync={updateProxyAllowanceAsync}
                            />
                        );
                    })}

                    {results.length === 0 && (
                        <NoTokenResults>
                            Could not find any matching supported tokens
                        </NoTokenResults>
                    )}
                </TokenSearchResults>
            </div>
        );
    }
}
