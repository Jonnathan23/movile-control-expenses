import { useTransactionSubmit } from "src/features/transactions/presentation/hooks/logic/transaction/use-transaction-submit.hook";

export function TransactionSaveButton() {
    const { buttonText, isSaveDisabled: isDisabled, isExpense, handleSaveClick } = useTransactionSubmit();

    return (
        <div
            className="sticky bottom-0 px-5 pb-8 pt-4 mt-auto flex-shrink-0"
            style={{ background: "linear-gradient(to top, #0c3c46 70%, transparent)" }}
        >
            <button
                type="button"
                onClick={handleSaveClick}
                disabled={isDisabled}
                className={`w-full py-4 rounded-2xl font-bold text-white text-base transition-all active:scale-[0.98] ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"
                }`}
                style={{
                    background: isExpense
                        ? "linear-gradient(135deg, #ef4444, #dc2626)"
                        : "linear-gradient(135deg, #39b8a2, #26a09b)",
                    boxShadow: isExpense ? "0 4px 20px rgba(239,68,68,0.35)" : "0 4px 20px rgba(38,160,155,0.35)",
                }}
            >
                {buttonText}
            </button>
        </div>
    );
}
