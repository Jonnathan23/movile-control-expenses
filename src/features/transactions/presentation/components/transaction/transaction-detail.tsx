import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list";

import { dateFormatHelper } from "src/shared/core/helpers/format.helper";

import { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

import AmountDisplay from "src/features/transactions/presentation/components/budget/amount-display";
import { useTransactionDetail } from "src/features/transactions/presentation/hooks/logic/transaction/use-transaction-detail.hook";

import "react-swipeable-list/dist/styles.css";

type TransactionDetailProps = {
    readonly transaction: TransactionEntity;
};

export default function TransactionDetail({ transaction }: TransactionDetailProps) {
    const { categoryInfo, handleDelete, handleUpdate } = useTransactionDetail(transaction);

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
                <div className="bg-bg-surface shadow-lg p-5 w-full border-b border-border-main flex gap-5 items-center">
                    <div>
                        <img src={`/icono_${categoryInfo?.icon ?? "gastos"}.svg`} alt="icono gasto" className="w-20" />
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-text-sub">{categoryInfo?.name ?? "Categoría eliminada"}</p>
                        <p>{transaction.description}</p>
                        <p className="text-text-main text-sm">{dateFormatHelper(transaction.date)}</p>
                    </div>

                    <AmountDisplay amount={transaction.amount} />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
}
