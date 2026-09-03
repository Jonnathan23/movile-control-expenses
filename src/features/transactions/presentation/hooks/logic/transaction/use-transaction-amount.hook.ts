import { useContext } from "react";

import { TransactionFormContext } from "src/features/transactions/presentation/context/transaction-form.context";
import type { CurriedActionHandler } from "src/features/transactions/presentation/types/event-handlers.type";

const MAX_DECIMALS = 2;

export interface UseTransactionAmountReturn {
    amount: string;
    isExpense: boolean;
    error: string;
    handleAmountKeyClick: CurriedActionHandler<string>;
}

export const useTransactionAmount = (): UseTransactionAmountReturn => {
    const { state, dispatch } = useContext(TransactionFormContext);

    const handleAmountKeyClick: CurriedActionHandler<string> = (key) => () => {
        if (key === "DEL") {
            dispatch({ type: "set-amount", payload: { amount: state.amount.slice(0, -1) } });
        } else if (key === "." && state.amount.includes(".")) {
            // no double decimal
        } else if (state.amount.split(".")[1]?.length >= MAX_DECIMALS) {
            // max 2 decimals
        } else {
            dispatch({ type: "set-amount", payload: { amount: state.amount + key } });
        }
    };

    const isExpense = state.txType === "expense";

    return {
        amount: state.amount,
        isExpense,
        error: state.error,
        handleAmountKeyClick,
    };
};
