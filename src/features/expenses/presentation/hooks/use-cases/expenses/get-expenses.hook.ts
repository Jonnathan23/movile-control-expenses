import { useQuery } from "@tanstack/react-query";
import type { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";
import type { QueryResult } from "src/shared/ui/presentation/interfaces/tan-stack.interface";
import { getExpensesUseCase } from "src/features/expenses/core/di/expense.dependency";

export const useGetExpenses = (): QueryResult<ExpenseEntity[]> => {
    const { data, isLoading, isFetching, isError, error, isSuccess, refetch } = useQuery({
        queryKey: ["expenses"],
        queryFn: () => getExpensesUseCase.execute(),
    });

    return {
        data,
        isLoading,
        isFetching,
        hasError: isError,
        errorDetails: error,
        isSuccessful: isSuccess,
        refetch,
    };
};
