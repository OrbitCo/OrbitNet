import { actionsEnums } from "../common/actionsEnums";
import { DebtEntity } from "../models";

class DebtsReducerState {
    debts: DebtEntity[];

    constructor() {
        this.debts = [];
    }
}

const handleFetchDebts = (state: DebtsReducerState, debts: DebtEntity[]) => ({
    ...state,
    debts,
});

export const debtsReducer = (state: DebtsReducerState = new DebtsReducerState(), action: any) => {
    switch (action.type) {
        case actionsEnums.DEBTS_FETCH_REQUEST_SUCCESSED:
            return handleFetchDebts(state, action.debts);
        default:
            return state;
    }
};
