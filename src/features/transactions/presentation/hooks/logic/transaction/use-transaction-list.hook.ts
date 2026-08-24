import { useMemo } from "react";

import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

import { useBudgetContext } from "src/features/transactions/presentation/hooks/use-budget-context.hook";

interface TransactionListReturn {
    filteredTransactions: TransactionEntity[];
    isEmpty: boolean;
}

export const useTransactionList = (): TransactionListReturn => {
    const { state } = useBudgetContext();

    const filteredTransactions = state.currentCategory
        ? state.transactions.filter((transaction) => transaction.categoryId === state.currentCategory)
        : state.transactions;
    const isEmpty = useMemo(() => filteredTransactions.length === 0, [filteredTransactions]);

    return {
        filteredTransactions,
        isEmpty,
    };
};
