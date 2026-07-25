import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { MutationResult } from "src/shared/ui/presentation/interfaces/tan-stack.interface";

import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

import type { CreateTransactionDto } from "src/features/transactions/core/application/dtos/create-transaction.dto";
import { CreateTransactionDtoImpl } from "src/features/transactions/core/application/dtos/create-transaction.dto";

import { ExecuteSaveTransactionUseCase } from "src/features/transactions/core/di/transaction.dependency";
import type { BudgetActions } from "src/features/transactions/presentation/reducers/budget.reducer";

interface UseSaveTransactionProps {
    dispatch: (value: BudgetActions) => void;
}

export const useSaveTransaction = ({
    dispatch,
}: UseSaveTransactionProps): MutationResult<TransactionEntity, Error, CreateTransactionDto> => {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: async (transactionDto: CreateTransactionDto) => {
            const validDto = CreateTransactionDtoImpl.create(transactionDto);
            return await ExecuteSaveTransactionUseCase(validDto);
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
