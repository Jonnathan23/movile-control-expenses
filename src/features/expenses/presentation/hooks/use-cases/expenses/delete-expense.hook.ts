import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { MutationResult } from "src/shared/ui/presentation/interfaces/tan-stack.interface";

import { ExecuteDeleteExpenseUseCase } from "src/features/expenses/core/di/expense.dependency";
import type { BudgetActions } from "src/features/expenses/presentation/reducers/budget.reducer";

interface UseDeleteExpenseProps {
    dispatch: (value: BudgetActions) => void;
}

export const useDeleteExpense = ({ dispatch }: UseDeleteExpenseProps): MutationResult<void, Error, string> => {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: async (id: string) => {
            return await ExecuteDeleteExpenseUseCase(id);
        },
        onSuccess(_, id) {
            dispatch({ type: "delete-expense", payload: { id } });
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
