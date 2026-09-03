import type { TransactionType } from "src/features/transactions/core/domain/enums/transaction.enum";

export interface TransactionFormState {
    txType: TransactionType;
    amount: string;
    categoryId: string;
    description: string;
    date: string;
    selectedAccount: string;
    isAccountOpen: boolean;
    error: string;
}

export type TransactionFormActions =
    | { type: "set-tx-type"; payload: { txType: TransactionType } }
    | { type: "set-amount"; payload: { amount: string } }
    | { type: "set-category"; payload: { categoryId: string } }
    | { type: "set-description"; payload: { description: string } }
    | { type: "set-date"; payload: { date: string } }
    | { type: "set-account"; payload: { selectedAccount: string } }
    | { type: "toggle-account-selector" }
    | { type: "set-error"; payload: { error: string } }
    | { type: "reset" };

export const transactionFormReducer = (state: TransactionFormState, action: TransactionFormActions): TransactionFormState => {
    switch (action.type) {
        case "set-tx-type":
            return { ...state, txType: action.payload.txType };
        case "set-amount":
            return { ...state, amount: action.payload.amount };
        case "set-category":
            return { ...state, categoryId: action.payload.categoryId };
        case "set-description":
            return { ...state, description: action.payload.description };
        case "set-date":
            return { ...state, date: action.payload.date };
        case "set-account":
            return { ...state, selectedAccount: action.payload.selectedAccount };
        case "toggle-account-selector":
            return { ...state, isAccountOpen: !state.isAccountOpen };
        case "set-error":
            return { ...state, error: action.payload.error };
        case "reset":
            return { ...state, error: "", amount: "", description: "" };
        default:
            return state;
    }
};
