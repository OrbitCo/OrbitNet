import { actionsEnums } from "../common/actionsEnums";
import { normalize } from "../utils/debtOrder";

import DebtsService from "../services/debts";

export function fetchDebts(networkId: number) {
    return async (dispatch: any) => {
        const { debts } = await DebtsService.list(networkId);

        const normalizedDebts = debts.map((debt: any) => {
            const { dharmaOrder, ...restDebt } = debt;

            const normalized = normalize(restDebt);

            return {
                ...normalized,
                dharmaOrder,
            };
        });

        dispatch({
            type: actionsEnums.DEBTS_FETCH_REQUEST_SUCCESSED,
            debts: normalizedDebts,
        });
    };
}
