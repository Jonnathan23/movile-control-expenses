import { type ReactNode, useEffect, useMemo, useReducer } from "react";

import { BudgetContext } from "src/features/transactions/presentation/context/budget.context";
import { useGetBudget } from "src/features/transactions/presentation/hooks/use-cases/budget/get-budget.hook";
import { useGetCategories } from "src/features/transactions/presentation/hooks/use-cases/categories/get-categories.hook";
import { useGetTransactions } from "src/features/transactions/presentation/hooks/use-cases/transactions/get-transactions.hook";
import { budgetReducer, initialState } from "src/features/transactions/presentation/reducers/budget.reducer";

interface BudgetProviderProps {
    children: ReactNode;
}

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
    //* use-cases
    const { data: budget } = useGetBudget();
    const { data: transactions } = useGetTransactions();
    const { data: categories } = useGetCategories();

    //* reducers
    const [state, dispatch] = useReducer(budgetReducer, {
        ...initialState,
        budget: budget?.amount ?? 0,
        transactions: transactions ?? [],
    });

    //* memo
    const totalTransaction = useMemo(
        () => state.transactions.reduce((total, transaction) => transaction.amount + total, 0),
        [state.transactions],
    );
    const remaininBudget = state.budget - totalTransaction;

    useEffect(() => {
        if (categories) {
            dispatch({
                type: "set-categories",
                payload: { categories },
            });
        }
    }, [categories]);

    useEffect(() => {
        if (budget) {
            dispatch({
                type: "add-budget",
                payload: { budget: budget.amount },
            });
        }
    }, [budget]);

    useEffect(() => {
        if (transactions) {
            dispatch({
                type: "set-transactions",
                payload: { transactions },
            });
        }
    }, [transactions]);

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalTransaction,
                remaininBudget,
            }}
        >
            {children}
        </BudgetContext.Provider>
    );
};
