import { useQuery } from "@tanstack/react-query";

import type { QueryResult } from "src/shared/ui/presentation/interfaces/tan-stack.interface";

import type { BudgetEntity } from "src/features/transactions/core/domain/entities/budget.entity";

import { ExecuteGetBudgetUseCase } from "src/features/transactions/core/di/transaction.dependency";

export const useGetBudget = (): QueryResult<BudgetEntity, Error> => {
    const budgetQuery = useQuery({
        queryKey: ["budget"],
        queryFn: ExecuteGetBudgetUseCase,
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
