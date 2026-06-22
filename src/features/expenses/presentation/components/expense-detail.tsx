import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import { useMemo } from "react";
import { formatDate } from "src/shared/helpers/format.helper";
import { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";

import { useBudget } from "src/features/expenses/presentation/hooks/use-budget.hook";
import { deleteExpenseUseCase } from "src/features/expenses/core/di/expense.dependency";
import AmountDisplay from "src/features/expenses/presentation/components/amount-display";

type ExpenseDetailProps = {
    readonly expense: ExpenseEntity;
};

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
    const { state, dispatch } = useBudget();
    const categoryInfo = useMemo(() => state.categories.find((cat) => cat.id === expense.category), [expense, state.categories]);

    const handleDelete = () => {
        deleteExpenseUseCase.execute(expense.id);
        dispatch({ type: "delete-expense", payload: { id: expense.id } });
    };

    const leadeingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => dispatch({ type: "get-expense-by-id", payload: { id: expense.id } })}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={handleDelete} destructive={true}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList>
            <SwipeableListItem maxSwipe={1} leadingActions={leadeingActions()} trailingActions={trailingActions()}>
                <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div>
                        <img src={`/icono_${categoryInfo?.icon ?? "gastos"}.svg`} alt="icono gasto" className="w-20" />
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">
                            {categoryInfo?.name ?? "Categoría eliminada"}
                        </p>
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDate(expense.date)}</p>
                    </div>

                    <AmountDisplay amount={expense.amount} />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
}
