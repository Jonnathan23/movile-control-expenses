import DatePicker from "react-date-picker";

import ErrorMessage from "src/shared/ui/presentation/components/errors/error-message";

import { useTransactionForm } from "src/features/transactions/presentation/hooks/forms/transaction/use-transaction-form.hook";

import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";

export default function TransactionForm() {
    const { transaction, error, state, handleChange, handleChangeDate, handleSubmit } = useTransactionForm();

    return (
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-2xl text-center font-black border-b-4 border-primary-border py-2">
                {state.editingId ? "Editar Gasto" : "Nuevo Gasto"}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label htmlFor="transactionName" className="text-xl">
                    Nombre Gasto:
                </label>
                <input
                    type="text"
                    id="transactionName"
                    name="transactionName"
                    placeholder="Añade el nombre del gasto"
                    className="bg-bg-input p-2"
                    value={transaction.transactionName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Cantidad:
                </label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    placeholder="Añade la cantidad del gasto, ej: 300"
                    className="bg-bg-input p-2"
                    value={transaction.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">
                    Categoria:
                </label>
                <select
                    id="category"
                    name="category"
                    className="bg-bg-input p-2"
                    value={transaction.category}
                    onChange={handleChange}
                >
                    <option value="" disabled>
                        --- Seleccione Categoria ---
                    </option>
                    {state.categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="transactionName" className="text-xl">
                    Fecha Gasto:
                </label>
                <DatePicker className="bg-bg-input p-2 border-0" value={transaction.date} onChange={handleChangeDate} />
            </div>

            <input
                className="bg-primary cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                type="submit"
                value={state.editingId ? "Guardar Cambios" : "Agregar Gasto"}
            />
        </form>
    );
}
