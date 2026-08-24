import { useQuery } from "@tanstack/react-query";

import type { QueryResult } from "src/shared/presentation/interfaces/tan-stack.interface";

import type { AccountEntity } from "src/features/accounts/core/domain/entities/account.entity";

import { ExecuteGetAccountsUseCase } from "src/features/accounts/core/di/account.dependency";

export const useGetAccounts = (): QueryResult<AccountEntity[]> => {
    const { data, isLoading, isFetching, isError, error, isSuccess, refetch } = useQuery({
        queryKey: ["accounts"],
        queryFn: ExecuteGetAccountsUseCase,
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
