import type { CategoryEntity } from "src/features/transactions/core/domain/entities/category.entity";
import { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

export type BudgetActions =
    | { type: "add-budget"; payload: { budget: number } }
    | { type: "show-modal" }
    | { type: "close-modal" }
    | { type: "add-transaction"; payload: { transaction: TransactionEntity } }
    | { type: "delete-transaction"; payload: { id: string } }
    | { type: "get-transaction-by-id"; payload: { id: string } }
    | { type: "update-transaction"; payload: { transaction: TransactionEntity } }
    | { type: "reset-app" }
    | { type: "add-filter-category"; payload: { id: string } }
    | { type: "set-categories"; payload: { categories: CategoryEntity[] } }
    | { type: "set-transactions"; payload: { transactions: TransactionEntity[] } };

export type BudgetState = {
    budget: number;
    modal: boolean;
    transactions: TransactionEntity[];
    editingId: string;
    currentCategory: string;
    categories: CategoryEntity[];
};

export const initialState: BudgetState = {
    budget: 0,
    modal: false,
    transactions: [],
    editingId: "",
    currentCategory: "",
    categories: [],
};

export const budgetReducer = (state: BudgetState = initialState, action: BudgetActions): BudgetState => {
    if (action.type === "add-budget") {
        return {
            ...state,
            budget: action.payload.budget,
        };
    }

    if (action.type === "show-modal") {
        return {
            ...state,
            modal: true,
        };
    }

    if (action.type === "close-modal") {
        return {
            ...state,
            modal: false,
            editingId: "",
        };
    }

    if (action.type === "add-transaction") {
        return {
            ...state,
            transactions: [...state.transactions, action.payload.transaction],
            modal: false,
        };
    }

    if (action.type === "delete-transaction") {
        return {
            ...state,
            transactions: state.transactions.filter((transaction) => transaction.id !== action.payload.id),
        };
    }

    if (action.type === "get-transaction-by-id") {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true,
        };
    }

    if (action.type === "update-transaction") {
        return {
            ...state,
            transactions: state.transactions.map((transaction) =>
                transaction.id === action.payload.transaction.id ? action.payload.transaction : transaction,
            ),
            modal: false,
            editingId: "",
        };
    }

    if (action.type === "reset-app") {
        return {
            ...state,
            budget: 0,
            transactions: [],
        };
    }

    if (action.type === "add-filter-category") {
        return {
            ...state,
            currentCategory: action.payload.id,
        };
    }

    if (action.type === "set-categories") {
        return {
            ...state,
            categories: action.payload.categories,
        };
    }

    if (action.type === "set-transactions") {
        return {
            ...state,
            transactions: action.payload.transactions,
        };
    }

    return state;
};
