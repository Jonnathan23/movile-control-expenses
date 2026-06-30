import { type ChangeEvent, type SyntheticEvent, useMemo, useState } from "react";

import { useBudget } from "src/features/expenses/presentation/hooks/use-budget-context.hook";
import { useSaveBudget } from "src/features/expenses/presentation/hooks/use-cases/budget/save-budget.hook";

interface BudgetFormReturn {
    budget: number;
    isValid: boolean;
    isPending: boolean;
    isSuccessful: boolean;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
}

export const useBudgetForm = (): BudgetFormReturn => {
    //* context
    const { dispatch } = useBudget();

    //* states
    const [budget, setBudget] = useState(0);

    //* memos
    const isValid = useMemo(() => Number.isNaN(budget) || budget <= 0, [budget]);

    //* use-cases
    const { executeMutation, isPending, isSuccessful } = useSaveBudget({ dispatch });

    //* handlers
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setBudget(e.target.valueAsNumber);
    };

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>): void => {
        e.preventDefault();
        executeMutation(budget);
    };

    return {
        budget,
        isValid,
        isPending,
        isSuccessful,
        handleChange,
        handleSubmit,
    };
};
