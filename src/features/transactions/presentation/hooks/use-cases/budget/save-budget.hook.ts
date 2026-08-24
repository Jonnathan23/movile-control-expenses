import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { MutationResult } from "src/shared/presentation/interfaces/tan-stack.interface";

import type { BudgetEntity } from "src/features/transactions/core/domain/entities/budget.entity";

import { ExecuteSaveBudgetUseCase } from "src/features/transactions/core/di/transaction.dependency";
import type { BudgetActions } from "src/features/transactions/presentation/reducers/budget.reducer";

interface UseSaveBudgetProps {
    dispatch: (value: BudgetActions) => void;
}

export const useSaveBudget = ({ dispatch }: UseSaveBudgetProps): MutationResult<BudgetEntity, Error, unknown> => {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: async (budgetAmount: unknown) => {
            return await ExecuteSaveBudgetUseCase({ amount: budgetAmount });
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
