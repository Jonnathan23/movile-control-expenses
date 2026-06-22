import { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";

export type BudgetActions =
    | { type: "add-budget"; payload: { budget: number } }
    | { type: "show-modal" }
    | { type: "close-modal" }
    | { type: "add-expense"; payload: { expense: ExpenseEntity } }
    | { type: "delete-expense"; payload: { id: string } }
    | { type: "get-expense-by-id"; payload: { id: string } }
    | { type: "update-expense"; payload: { expense: ExpenseEntity } }
    | { type: "reset-app" }
    | { type: "add-filter-category"; payload: { id: string } };

export type BudgetState = {
    budget: number;
    modal: boolean;
    expenses: ExpenseEntity[];
    editingId: string;
    currentCategory: string;
};

export const initialState: BudgetState = {
    budget: 0,
    modal: false,
    expenses: [],
    editingId: "",
    currentCategory: "",
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

    if (action.type === "add-expense") {
        return {
            ...state,
            expenses: [...state.expenses, action.payload.expense],
            modal: false,
        };
    }

    if (action.type === "delete-expense") {
        return {
            ...state,
            expenses: state.expenses.filter((expense) => expense.id !== action.payload.id),
        };
    }

    if (action.type === "get-expense-by-id") {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true,
        };
    }

    if (action.type === "update-expense") {
        return {
            ...state,
            expenses: state.expenses.map((expense) =>
                expense.id === action.payload.expense.id ? action.payload.expense : expense,
            ),
            modal: false,
            editingId: "",
        };
    }

    if (action.type === "reset-app") {
        return {
            ...state,
            budget: 0,
            expenses: [],
        };
    }

    if (action.type === "add-filter-category") {
        return {
            ...state,
            currentCategory: action.payload.id,
        };
    }

    return state;
};
