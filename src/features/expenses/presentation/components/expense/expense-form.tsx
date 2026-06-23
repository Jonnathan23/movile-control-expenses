import DatePicker from "react-date-picker";

import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { useExpenseForm } from "src/features/expenses/presentation/hooks/forms/expense/use-expense-form.hook";
import ErrorMessage from "src/shared/ui/presentation/components/errors/error-message";

export default function ExpenseForm() {
    const { expense, error, state, handleChange, handleChangeDate, handleSubmit } = useExpenseForm();

    return (
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-2xl text-center font-black border-b-4 border-blue-500 py-2">
                {state.editingId ? "Editar Gasto" : "Nuevo Gasto"}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">
                    Nombre Gasto:
                </label>
                <input
                    type="text"
                    id="expenseName"
                    name="expenseName"
                    placeholder="Añade el nombre del gasto"
                    className="bg-slate-100 p-2"
                    value={expense.expenseName}
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
                    className="bg-slate-100 p-2"
                    value={expense.amount}
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
                    className="bg-slate-100 p-2"
                    value={expense.category}
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
                <label htmlFor="expenseName" className="text-xl">
                    Fecha Gasto:
                </label>
                <DatePicker className="bg-slate-100 p-2 border-0" value={expense.date} onChange={handleChangeDate} />
            </div>

            <input
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                type="submit"
                value={state.editingId ? "Guardar Cambios" : "Agregar Gasto"}
            />
        </form>
    );
}
