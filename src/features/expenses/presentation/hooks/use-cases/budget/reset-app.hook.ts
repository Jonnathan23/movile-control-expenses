import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { MutationResult } from "src/shared/ui/presentation/interfaces/tan-stack.interface";

import { resetAppUseCase } from "src/features/expenses/core/di/expense.dependency";
import type { BudgetActions } from "src/features/expenses/presentation/reducers/budget.reducer";

interface UseResetAppProps {
    dispatch: (value: BudgetActions) => void;
}

export const useResetApp = ({ dispatch }: UseResetAppProps): MutationResult<void, Error, void> => {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: async () => {
            return await resetAppUseCase.execute();
        },
        onSuccess() {
            dispatch({ type: "reset-app" });
            queryClient.invalidateQueries({ queryKey: ["budget"] });
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
        },
    });

    return {
        executeMutation: mutate,
        isPending,
        hasError: isError,
        errorDetails: error,
        isSuccessful: !isError,
    };
};
