import { ExecuteResetAppUseCase } from "src/features/expenses/core/di/expense.dependency";
import type { BudgetActions } from "src/features/expenses/presentation/reducers/budget.reducer";

interface UseBudgetTrackReturn {
    handleResetApp: () => void;
    maxPercentage: number;
    decimalPlaces: number;
    dangerThreshold: number;
    percentage: number;
}

interface BudgetTrackProps {
    totalExpense: number;
    budget: number;
    dispatch: (value: BudgetActions) => void;
}

export const useBudgetTrack = ({ totalExpense, budget, dispatch }: BudgetTrackProps): UseBudgetTrackReturn => {
    const maxPercentage = 100;
    const decimalPlaces = 2;
    const dangerThreshold = 80;
    const percentage = +((totalExpense / budget) * maxPercentage).toFixed(decimalPlaces);

    const handleResetApp = (): void => {
        ExecuteResetAppUseCase();
        dispatch({ type: "reset-app" });
    };

    return {
        handleResetApp,
        maxPercentage,
        decimalPlaces,
        dangerThreshold,
        percentage,
    };
};
