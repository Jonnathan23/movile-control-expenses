import { useMemo, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { saveBudgetUseCase } from "src/features/expenses/core/di/expense.dependency";
import { useBudget } from "src/features/expenses/presentation/hooks/use-budget-context.hook";

export const useBudgetForm = () => {
    //* context
    const { dispatch } = useBudget();

    //* states
    const [budget, setBudget] = useState(0);

    //* memos
    const isValid = useMemo(() => Number.isNaN(budget) || budget <= 0, [budget]);

    //* use-cases
    const saveBudget = () => saveBudgetUseCase.execute(budget);

    //* handlers
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber);
    };

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const savedBudget = saveBudget();
        dispatch({ type: "add-budget", payload: { budget: savedBudget.amount } });
    };

    return {
        budget,
        isValid,
        handleChange,
        handleSubmit,
    };
};
