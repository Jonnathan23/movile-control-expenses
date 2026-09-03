import { useContext } from "react";
import { X } from "lucide-react";

import { TransactionFormContext } from "src/features/transactions/presentation/context/transaction-form.context";

export function TransactionHeader() {
    const { state, onClose: handleCloseClick } = useContext(TransactionFormContext);
    const isExpense = state.txType === "expense";

    return (
        <div className="flex items-center justify-between px-5 pt-12 pb-4">
            <h2 className="text-lg font-bold text-white">{isExpense ? "Nuevo Gasto" : "Nuevo Ingreso"}</h2>
            <button
                type="button"
                onClick={handleCloseClick}
                aria-label="Cerrar"
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
                <X size={20} color="#dde8e6" />
            </button>
        </div>
    );
}
