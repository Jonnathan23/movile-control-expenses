import { useQuery } from "@tanstack/react-query";

import type { QueryResult } from "src/shared/ui/presentation/interfaces/tan-stack.interface";

import type { CategoryEntity } from "src/features/transactions/core/domain/entities/category.entity";

import { ExecuteGetCategoriesUseCase } from "src/features/transactions/core/di/transaction.dependency";

export const useGetCategories = (): QueryResult<CategoryEntity[]> => {
    const queryCategories = useQuery({
        queryKey: ["categories"],
        queryFn: ExecuteGetCategoriesUseCase,
    });

    return {
        data: queryCategories.data,
        isLoading: queryCategories.isLoading,
        isFetching: queryCategories.isFetching,
        hasError: queryCategories.isError,
        errorDetails: queryCategories.error,
        isSuccessful: queryCategories.isSuccess,
        refetch: queryCategories.refetch,
    };
};
