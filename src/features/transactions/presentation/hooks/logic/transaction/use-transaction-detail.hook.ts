import { useMemo } from "react";

import type { CategoryEntity } from "src/features/transactions/core/domain/entities/category.entity";
import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

import { useBudgetContext } from "src/features/transactions/presentation/hooks/use-budget-context.hook";
import { useDeleteTransaction } from "src/features/transactions/presentation/hooks/use-cases/transactions/delete-transaction.hook";

interface TransactionDetailReturn {
    categoryInfo: CategoryEntity | undefined;
    handleDelete: () => void;
    handleUpdate: () => void;
}

export const useTransactionDetail = (transaction: TransactionEntity): TransactionDetailReturn => {
    const { state, dispatch } = useBudgetContext();
    const categoryInfo = useMemo(
        () => state.categories.find((cat) => cat.id === transaction.category),
        [transaction, state.categories],
    );
    const { executeMutation: deleteTransaction } = useDeleteTransaction({ dispatch });

    const handleDelete = (): void => {
        deleteTransaction(transaction.id);
    };

    const handleUpdate = (): void => {
        dispatch({ type: "get-transaction-by-id", payload: { id: transaction.id } });
    };

    return {
        categoryInfo,
        handleDelete,
        handleUpdate,
    };
};
