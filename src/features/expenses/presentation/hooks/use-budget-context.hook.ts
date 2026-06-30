import { useContext } from "react";

import { BudgetContext, type BudgetContextProps } from "src/features/expenses/presentation/context/budget.context";

export const useBudget = (): BudgetContextProps => {
    const context = useContext(BudgetContext);

    if (!context) throw new Error("useBudget must be used within a BudgetProvider");

    return context;
};
