import { useReducer, useEffect, type ReactNode, useMemo } from "react";
import { budgetReducer, initialState } from "src/features/expenses/presentation/reducers/budget.reducer";

import { BudgetContext } from "src/features/expenses/presentation/context/budget.context";
import { useGetBudget } from "src/features/expenses/presentation/hooks/use-cases/budget/get-budget.hook";
import { useGetExpenses } from "src/features/expenses/presentation/hooks/use-cases/expenses/get-expenses.hook";
import { useGetCategories } from "src/features/expenses/presentation/hooks/use-cases/cateories/get-categories.hook";

interface BudgetProviderProps {
    children: ReactNode;
}

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
    //* use-cases
    const { data: budget } = useGetBudget();
    const { data: expenses } = useGetExpenses();
    const { data: categories } = useGetCategories();

    //* reducers
    const [state, dispatch] = useReducer(budgetReducer, {
        ...initialState,
        budget: budget?.amount ?? 0,
        expenses: expenses ?? [],
    });

    //* memo
    const totalExpense = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses]);
    const remaininBudget = state.budget - totalExpense;

    useEffect(() => {
        dispatch({
            type: "set-categories",
            payload: { categories: categories ?? [] },
        });
    }, [categories]);

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpense,
                remaininBudget,
            }}
        >
            {children}
        </BudgetContext.Provider>
    );
};
