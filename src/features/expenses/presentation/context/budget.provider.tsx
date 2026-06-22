import { useReducer, type ReactNode, useMemo } from "react";
import { budgetReducer, initialState } from "src/features/expenses/presentation/reducers/budget.reducer";

import { getExpensesUseCase, getBudgetUseCase } from "src/features/expenses/core/di/expense.dependency";
import { BudgetContext } from "src/features/expenses/presentation/context/budget.context";

interface BudgetProviderProps {
    children: ReactNode;
}

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, {
        ...initialState,
        budget: getBudgetUseCase.execute().amount,
        expenses: getExpensesUseCase.execute(),
    });

    const totalExpense = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses]);
    const remaininBudget = state.budget - totalExpense;

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
