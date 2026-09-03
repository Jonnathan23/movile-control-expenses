import { useTransactionAmount } from "src/features/transactions/presentation/hooks/logic/transaction/use-transaction-amount.hook";

export function TransactionNumericKeypad() {
    const { handleAmountKeyClick: handleKeyClick } = useTransactionAmount();

    const keys: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "DEL"];

    return (
        <div className="grid grid-cols-3 gap-2">
            {keys.map((key) => (
                <button
                    key={key}
                    type="button"
                    onClick={handleKeyClick(key)}
                    aria-label={key === "DEL" ? "Borrar" : key}
                    className="py-4 rounded-xl text-lg font-semibold transition-all active:scale-95 hover:brightness-110"
                    style={{
                        background: key === "DEL" ? "rgba(239,68,68,0.15)" : "#1a5862",
                        color: key === "DEL" ? "#ef4444" : "#fff",
                        border: "1px solid rgba(38,160,155,0.15)",
                    }}
                >
                    {key === "DEL" ? "⌫" : key}
                </button>
            ))}
        </div>
    );
}
