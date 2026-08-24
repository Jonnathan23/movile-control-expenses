import { useQuery } from "@tanstack/react-query";

import type { QueryResult } from "src/shared/presentation/interfaces/tan-stack.interface";

import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

import { ExecuteGetTransactionsUseCase } from "src/features/transactions/core/di/transaction.dependency";

export const useGetTransactions = (): QueryResult<TransactionEntity[]> => {
    const { data, isLoading, isFetching, isError, error, isSuccess, refetch } = useQuery({
        queryKey: ["transactions"],
        queryFn: ExecuteGetTransactionsUseCase,
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
