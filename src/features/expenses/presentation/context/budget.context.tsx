import { createContext, type Dispatch } from "react";

import { type BudgetActions, type BudgetState } from "src/features/expenses/presentation/reducers/budget.reducer";

export type BudgetContextProps = {
    state: BudgetState;
    dispatch: Dispatch<BudgetActions>;
    totalExpense: number;
    remaininBudget: number;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);
