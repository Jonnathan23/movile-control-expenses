import type { QueryResult } from "src/shared/ui/presentation/interfaces/tan-stack.interface";
import type { BudgetEntity } from "src/features/expenses/core/domain/entities/budget.entity";
import { useQuery } from "@tanstack/react-query";
import { getBudgetUseCase } from "src/features/expenses/core/di/expense.dependency";

export const useGetBudget = (): QueryResult<BudgetEntity, Error> => {
    const budgetQuery = useQuery({
        queryKey: ["budget"],
        queryFn: () => getBudgetUseCase.execute(),
    });

    return {
        data: budgetQuery.data,
        isLoading: budgetQuery.isLoading,
        isFetching: budgetQuery.isFetching,
        hasError: budgetQuery.isError,
        errorDetails: budgetQuery.error,
        isSuccessful: budgetQuery.isSuccess,
        refetch: budgetQuery.refetch,
    };
};
