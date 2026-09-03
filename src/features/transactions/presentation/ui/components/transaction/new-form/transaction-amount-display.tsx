import { useTransactionAmount } from "src/features/transactions/presentation/hooks/logic/transaction/use-transaction-amount.hook";

export function TransactionAmountDisplay() {
    const { amount, isExpense, error } = useTransactionAmount();

    return (
        <div className="rounded-2xl p-5 text-center" style={{ background: "#1a5862", border: "1px solid rgba(38,160,155,0.2)" }}>
            <label className="block text-xs font-medium mb-2" style={{ color: "#85c9c0" }}>
                Monto
            </label>
            <p className="text-4xl font-bold" style={{ color: isExpense ? "#ef4444" : "#39b8a2" }}>
                {amount ? `${isExpense ? "-" : "+"}$${amount}` : "$0.00"}
            </p>
            {error && (
                <p className="text-xs mt-2" style={{ color: "#ef4444" }}>
                    {error}
                </p>
            )}
        </div>
    );
}
