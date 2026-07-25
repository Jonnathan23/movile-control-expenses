import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { MutationResult } from "src/shared/ui/presentation/interfaces/tan-stack.interface";

import type { BudgetEntity } from "src/features/transactions/core/domain/entities/budget.entity";

import { CreateBudgetDtoImpl } from "src/features/transactions/core/application/dtos/create-budget.dto";

import { ExecuteSaveBudgetUseCase } from "src/features/transactions/core/di/transaction.dependency";
import type { BudgetActions } from "src/features/transactions/presentation/reducers/budget.reducer";

interface UseSaveBudgetProps {
    dispatch: (value: BudgetActions) => void;
}

export const useSaveBudget = ({ dispatch }: UseSaveBudgetProps): MutationResult<BudgetEntity, Error, number> => {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: async (budgetAmount: number) => {
            const validDto = CreateBudgetDtoImpl.create({ amount: budgetAmount });
            return await ExecuteSaveBudgetUseCase(validDto);
        },
        onSuccess(data) {
            const { amount } = data;
            dispatch({ type: "add-budget", payload: { budget: amount } });
            queryClient.invalidateQueries({ queryKey: ["budget"] });
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
