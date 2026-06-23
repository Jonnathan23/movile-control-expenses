import { useMemo } from "react";
import { useBudget } from "src/features/expenses/presentation/hooks/use-budget-context.hook";
import { useDeleteExpense } from "src/features/expenses/presentation/hooks/use-cases/expenses/delete-expense.hook";
import type { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";

export const useExpenseDetail = (expense: ExpenseEntity) => {
    const { state, dispatch } = useBudget();
    const categoryInfo = useMemo(() => state.categories.find((cat) => cat.id === expense.category), [expense, state.categories]);
    const { executeMutation: deleteExpense } = useDeleteExpense({ dispatch });

    const handleDelete = () => {
        deleteExpense(expense.id);
    };

    const handleUpdate = () => {
        dispatch({ type: "get-expense-by-id", payload: { id: expense.id } });
    };

    return {
        categoryInfo,
        handleDelete,
        handleUpdate,
    };
};
