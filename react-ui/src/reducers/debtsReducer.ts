import { actionsEnums } from "../common/actionsEnums";
import { DebtEntity } from "../models";

class DebtsReducerState {
    debts: DebtEntity[];

    constructor() {
        this.debts = [];
    }
}

const handlePendingDebtsFetch = (state: DebtsReducerState, debts: DebtEntity[]) => ({
    ...state,
    debts,
});

const handlePendingDeptRemoval = (state: DebtsReducerState, issuanceHash: string) => ({
    ...state,
    debts: state.debts.filter((debt) => debt.issuanceHash !== issuanceHash),
});

export const debtsReducer = (state: DebtsReducerState = new DebtsReducerState(), action: any) => {
    switch (action.type) {
        case actionsEnums.DEBTS_FETCH_REQUEST_SUCCESSED:
            return handlePendingDebtsFetch(state, action.debts);
        case actionsEnums.FILL_DEBT_ENTITY:
        case actionsEnums.CANCEL_DEBT_ENTITY:
            return handlePendingDeptRemoval(state, action.payload);
        default:
            return state;
    }
};
