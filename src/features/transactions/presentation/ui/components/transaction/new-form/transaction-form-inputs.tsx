import { useTransactionInputs } from "src/features/transactions/presentation/hooks/logic/transaction/use-transaction-inputs.hook";

export function TransactionFormInputs() {
    const { description, date, handleDescriptionChange, handleDateChange, handleInputFocus, handleInputBlur } =
        useTransactionInputs();

    return (
        <>
            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-xs font-medium mb-2" style={{ color: "#85c9c0" }}>
                    Descripción (opcional)
                </label>
                <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Ej. Almuerzo con amigos"
                    className="w-full p-4 rounded-2xl text-sm text-white placeholder:text-[#85c9c0] outline-none transition-colors"
                    style={{
                        background: "#1a5862",
                        border: "1px solid rgba(38,160,155,0.25)",
                    }}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                />
            </div>

            {/* Date */}
            <div>
                <label htmlFor="tx-date" className="block text-xs font-medium mb-2" style={{ color: "#85c9c0" }}>
                    Fecha
                </label>
                <input
                    id="tx-date"
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    className="w-full p-4 rounded-2xl text-sm text-white outline-none transition-colors"
                    style={{
                        background: "#1a5862",
                        border: "1px solid rgba(38,160,155,0.25)",
                        colorScheme: "dark",
                    }}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                />
            </div>
        </>
    );
}
