import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { MutationResult } from "src/shared/presentation/interfaces/tan-stack.interface";

import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

import { ExecuteCreateTransactionUseCase } from "src/features/transactions/core/di/transaction.dependency";
import type { BudgetActions } from "src/features/transactions/presentation/reducers/budget.reducer";

interface UseSaveTransactionProps {
    dispatch: (value: BudgetActions) => void;
}

export const useCreateTransaction = (props: UseSaveTransactionProps): MutationResult<TransactionEntity, Error, unknown> => {
    const { dispatch } = props;

    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: async (transactionDto: unknown) => {
            return await ExecuteCreateTransactionUseCase(transactionDto);
        },
        onSuccess(data) {
            dispatch({ type: "add-transaction", payload: { transaction: data } });
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
