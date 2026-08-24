import { useContext } from "react";

import { BudgetContext, type BudgetContextProps } from "src/features/transactions/presentation/context/budget.context";

export const useBudgetContext = (): BudgetContextProps => {
    const context = useContext(BudgetContext);

    if (!context) throw new Error("useBudget must be used within a BudgetProvider");

    return context;
};
