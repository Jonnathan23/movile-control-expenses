import TransactionDetail from "src/features/transactions/presentation/components/transaction/transaction-detail";
import { useTransactionList } from "src/features/transactions/presentation/hooks/logic/transaction/use-transaction-list.hook";

export default function TransactionList() {
    const { filteredTransactions, isEmpty } = useTransactionList();

    return (
        <div className="mt-10 bg-bg-surface shadow-lg rounded-lg p-10">
            {isEmpty ? (
                <p className="text-text-main text-2xl  font-bold">No hay gastos</p>
            ) : (
                <>
                    <p className="text-text-main text-2xl font-bold my-5">Listado de gastos</p>

                    {filteredTransactions.map((transaction) => (
                        <TransactionDetail key={transaction.id} transaction={transaction} />
                    ))}
                </>
            )}
        </div>
    );
}
