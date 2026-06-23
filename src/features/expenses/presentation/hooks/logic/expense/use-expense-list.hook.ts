import { useMemo } from "react";
import { useBudget } from "src/features/expenses/presentation/hooks/use-budget-context.hook";

export const useExpenseList = () => {
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
