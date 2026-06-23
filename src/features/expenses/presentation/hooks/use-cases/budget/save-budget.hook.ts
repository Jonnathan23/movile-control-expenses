import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveBudgetUseCase } from "src/features/expenses/core/di/expense.dependency";
import { CreateBudgetDtoImpl } from "src/features/expenses/core/domain/dtos/create-budget.dto";
import type { BudgetEntity } from "src/features/expenses/core/domain/entities/budget.entity";
import type { BudgetActions } from "src/features/expenses/presentation/reducers/budget.reducer";
import type { MutationResult } from "src/shared/ui/presentation/interfaces/tan-stack.interface";

interface UseSaveBudgetProps {
    dispatch: (value: BudgetActions) => void;
}

export const useSaveBudget = ({ dispatch }: UseSaveBudgetProps): MutationResult<BudgetEntity, Error, number> => {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: async (budgetAmount: number) => {
            const validDto = CreateBudgetDtoImpl.create({ amount: budgetAmount });
            return await saveBudgetUseCase.execute(validDto);
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
