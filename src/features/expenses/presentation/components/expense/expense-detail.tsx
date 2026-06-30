import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list";

import { globalDateFormatter } from "src/shared/core/helpers/format.helper";

import { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";

import AmountDisplay from "src/features/expenses/presentation/components/budget/amount-display";
import { useExpenseDetail } from "src/features/expenses/presentation/hooks/logic/expense/use-expense-detail.hook";

import "react-swipeable-list/dist/styles.css";

type ExpenseDetailProps = {
    readonly expense: ExpenseEntity;
};

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
    const { categoryInfo, handleDelete, handleUpdate } = useExpenseDetail(expense);

    const leadeingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={handleUpdate}>Actualizar</SwipeAction>
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
                        <p className="text-slate-600 text-sm">{globalDateFormatter.formatDate(expense.date)}</p>
                    </div>

                    <AmountDisplay amount={expense.amount} />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
}
