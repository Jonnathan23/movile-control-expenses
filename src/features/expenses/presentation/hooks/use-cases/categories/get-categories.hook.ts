import { useQuery } from "@tanstack/react-query";
import { getCategoriesUseCase } from "src/features/expenses/core/di/expense.dependency";
import type { CategoryEntity } from "src/features/expenses/core/domain/entities/category.entity";
import type { QueryResult } from "src/shared/ui/presentation/interfaces/tan-stack.interface";

export const useGetCategories = (): QueryResult<CategoryEntity[]> => {
    const queryCategories = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategoriesUseCase.execute(),
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
