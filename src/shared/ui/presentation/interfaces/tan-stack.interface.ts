import type { UseMutateFunction, RefetchOptions, QueryObserverResult } from "@tanstack/react-query";

export interface MutationResult<TData, TError, TVariables> {
    executeMutation: UseMutateFunction<TData, TError, TVariables, unknown>;
    isPending: boolean;
    hasError: boolean;
    errorDetails: TError | null;
    isSuccessful: boolean;
}

export interface QueryResult<TData, TError = Error> {
    data: TData | undefined;
    isLoading: boolean;
    isFetching: boolean;
    hasError: boolean;
    errorDetails: TError | null;
    isSuccessful: boolean;
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<TData, TError>>;
}
