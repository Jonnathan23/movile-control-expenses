import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { MutationResult } from "src/shared/ui/presentation/interfaces/tan-stack.interface";

import { ExecuteDeleteTransactionUseCase } from "src/features/transactions/core/di/transaction.dependency";
import type { BudgetActions } from "src/features/transactions/presentation/reducers/budget.reducer";

interface UseDeleteTransactionProps {
    dispatch: (value: BudgetActions) => void;
}

export const useDeleteTransaction = ({ dispatch }: UseDeleteTransactionProps): MutationResult<void, Error, string> => {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: async (id: string) => {
            return await ExecuteDeleteTransactionUseCase(id);
        },
        onSuccess(_, id) {
            dispatch({ type: "delete-transaction", payload: { id } });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
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
