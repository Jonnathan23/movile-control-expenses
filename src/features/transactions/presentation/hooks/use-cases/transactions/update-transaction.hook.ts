import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { MutationResult } from "src/shared/presentation/interfaces/tan-stack.interface";

import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

import { ExecuteUpdateTransactionUseCase } from "src/features/transactions/core/di/transaction.dependency";
import type { BudgetActions } from "src/features/transactions/presentation/reducers/budget.reducer";

interface UseUpdateTransactionProps {
    dispatch: (value: BudgetActions) => void;
}

export const useUpdateTransaction = ({
    dispatch,
}: UseUpdateTransactionProps): MutationResult<TransactionEntity, Error, { id: string; data: unknown }> => {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
            return await ExecuteUpdateTransactionUseCase(id, data);
        },
        onSuccess(data) {
            dispatch({ type: "update-transaction", payload: { transaction: data } });
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
