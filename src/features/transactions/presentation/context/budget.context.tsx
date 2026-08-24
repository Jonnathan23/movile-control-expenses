import { createContext, type Dispatch } from "react";

import { type BudgetActions, type BudgetState } from "src/features/transactions/presentation/reducers/budget.reducer";

export type BudgetContextProps = {
    state: BudgetState;
    dispatch: Dispatch<BudgetActions>;
    totalTransaction: number;
    remaininBudget: number;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);
