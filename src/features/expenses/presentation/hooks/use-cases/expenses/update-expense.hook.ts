import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExpenseUseCase } from "src/features/expenses/core/di/expense.dependency";
import { UpdateExpenseDtoImpl } from "src/features/expenses/core/domain/dtos/update-expense.dto";
import type { UpdateExpenseDto } from "src/features/expenses/core/domain/dtos/update-expense.dto";
import type { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";
import type { BudgetActions } from "src/features/expenses/presentation/reducers/budget.reducer";
import type { MutationResult } from "src/shared/ui/presentation/interfaces/tan-stack.interface";

interface UseUpdateExpenseProps {
    dispatch: (value: BudgetActions) => void;
}

export const useUpdateExpense = ({ dispatch }: UseUpdateExpenseProps): MutationResult<ExpenseEntity, Error, UpdateExpenseDto> => {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: async (expenseDto: UpdateExpenseDto) => {
            const validDto = UpdateExpenseDtoImpl.create(expenseDto);
            return await updateExpenseUseCase.execute(validDto);
        },
        onSuccess(data) {
            dispatch({ type: "update-expense", payload: { expense: data } });
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
