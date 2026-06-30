import { useMemo } from "react";

import type { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";

import { useBudget } from "src/features/expenses/presentation/hooks/use-budget-context.hook";

interface ExpenseListReturn {
    filteredExpenses: ExpenseEntity[];
    isEmpty: boolean;
}

export const useExpenseList = (): ExpenseListReturn => {
    const { state } = useBudget();

    const filteredExpenses = state.currentCategory
        ? state.expenses.filter((expense) => expense.category === state.currentCategory)
        : state.expenses;
    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses]);

    return {
        filteredExpenses,
        isEmpty,
    };
};
