import type { Dispatch } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CustomError } from "src/shared/core/errors/custom-error.error";
import type { MutationResult } from "src/shared/presentation/interfaces/tan-stack.interface";

import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

import { ExecuteCreateTransactionUseCase } from "src/features/transactions/core/di/transaction.dependency";
import type { BudgetActions } from "src/features/transactions/presentation/reducers/budget.reducer";
import type { TransactionFormActions } from "src/features/transactions/presentation/reducers/transaction-form.reducer";

interface UseSaveTransactionProps {
    readonly dispatch: (value: BudgetActions) => void;
    readonly dispatchTransaction: Dispatch<TransactionFormActions>;

    readonly onClose: () => void;
}

export const useCreateTransaction = (props: UseSaveTransactionProps): MutationResult<TransactionEntity, Error, unknown> => {
    const { dispatch, dispatchTransaction, onClose } = props;

    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (transactionDto: unknown) => {
            return ExecuteCreateTransactionUseCase(transactionDto);
        },
        onSuccess(data) {
            dispatch({ type: "add-transaction", payload: { transaction: data } });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            onClose();
        },
        onError: (err) => {
            if (err instanceof CustomError) {
                dispatchTransaction({
                    type: "set-error",
                    payload: { error: err.errors[0]?.message ?? "Error al guardar el registro" },
                });
            } else {
                dispatchTransaction({ type: "set-error", payload: { error: "Ocurrió un error inesperado" } });
            }
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
