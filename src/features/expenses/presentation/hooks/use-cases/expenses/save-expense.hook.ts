import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveExpenseUseCase } from "src/features/expenses/core/di/expense.dependency";
import { CreateExpenseDtoImpl } from "src/features/expenses/core/domain/dtos/create-expense.dto";
import type { CreateExpenseDto } from "src/features/expenses/core/domain/dtos/create-expense.dto";
import type { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";
import type { BudgetActions } from "src/features/expenses/presentation/reducers/budget.reducer";
import type { MutationResult } from "src/shared/ui/presentation/interfaces/tan-stack.interface";

interface UseSaveExpenseProps {
    dispatch: (value: BudgetActions) => void;
}

export const useSaveExpense = ({ dispatch }: UseSaveExpenseProps): MutationResult<ExpenseEntity, Error, CreateExpenseDto> => {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: async (expenseDto: CreateExpenseDto) => {
            const validDto = CreateExpenseDtoImpl.create(expenseDto);
            return await saveExpenseUseCase.execute(validDto);
        },
        onSuccess(data) {
            dispatch({ type: "add-expense", payload: { expense: data } });
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
