import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

import type { TransactionType } from "src/features/transactions/core/domain/enums/transaction.enum";

import { useTransactionInputs } from "src/features/transactions/presentation/hooks/logic/transaction/use-transaction-inputs.hook";

export function TransactionTypeToggle() {
    const { txType, handleTxTypeClick: handleTypeChange } = useTransactionInputs();
    const transactionsTypes: TransactionType[] = ["expense", "income"];

    return (
        <div
            className="flex p-1 rounded-2xl gap-1"
            style={{ background: "#0a3240" }}
            role="group"
            aria-label="Tipo de transacción"
        >
            {transactionsTypes.map((type) => (
                <button
                    key={type}
                    type="button"
                    onClick={handleTypeChange(type)}
                    aria-pressed={txType === type}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{
                        background: txType === type ? (type === "expense" ? "#ef4444" : "#26a09b") : "transparent",
                        color: txType === type ? "#fff" : "#85c9c0",
                    }}
                >
                    {type === "expense" ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                    {type === "expense" ? "Gasto" : "Ingreso"}
                </button>
            ))}
        </div>
    );
}
