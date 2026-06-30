import { useMemo } from "react";

import type { CategoryEntity } from "src/features/expenses/core/domain/entities/category.entity";
import type { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";

import { useBudget } from "src/features/expenses/presentation/hooks/use-budget-context.hook";
import { useDeleteExpense } from "src/features/expenses/presentation/hooks/use-cases/expenses/delete-expense.hook";

interface ExpenseDetailReturn {
    categoryInfo: CategoryEntity | undefined;
    handleDelete: () => void;
    handleUpdate: () => void;
}

export const useExpenseDetail = (expense: ExpenseEntity): ExpenseDetailReturn => {
    const { state, dispatch } = useBudget();
    const categoryInfo = useMemo(() => state.categories.find((cat) => cat.id === expense.category), [expense, state.categories]);
    const { executeMutation: deleteExpense } = useDeleteExpense({ dispatch });

    const handleDelete = (): void => {
        deleteExpense(expense.id);
    };

    const handleUpdate = (): void => {
        dispatch({ type: "get-expense-by-id", payload: { id: expense.id } });
    };

    return {
        categoryInfo,
        handleDelete,
        handleUpdate,
    };
};
