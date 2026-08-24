import { ExecuteResetAppUseCase } from "src/features/transactions/core/di/transaction.dependency";
import type { BudgetActions } from "src/features/transactions/presentation/reducers/budget.reducer";

interface UseBudgetTrackReturn {
    handleResetApp: () => void;
    maxPercentage: number;
    decimalPlaces: number;
    dangerThreshold: number;
    percentage: number;
}

interface BudgetTrackProps {
    totalTransaction: number;
    budget: number;
    dispatch: (value: BudgetActions) => void;
}

export const useBudgetTrack = ({ totalTransaction, budget, dispatch }: BudgetTrackProps): UseBudgetTrackReturn => {
    const maxPercentage = 100;
    const decimalPlaces = 2;
    const dangerThreshold = 80;
    const percentage = +((totalTransaction / budget) * maxPercentage).toFixed(decimalPlaces);

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
