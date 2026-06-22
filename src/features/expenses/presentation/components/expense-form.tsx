import { type ChangeEvent, type SyntheticEvent, useState } from "react";
import DatePicker from "react-date-picker";

import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { useBudget } from "src/features/expenses/presentation/hooks/use-budget.hook";

import { saveExpenseUseCase, updateExpenseUseCase, defaultCategories } from "src/features/expenses/core/di/expense.dependency";
import { CreateExpenseDtoImpl } from "src/features/expenses/core/domain/dtos/create-expense.dto";
import { UpdateExpenseDtoImpl } from "src/features/expenses/core/domain/dtos/update-expense.dto";
import ErrorMessage from "src/shared/presentation/errors/error-message";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ExpenseForm() {
    const initialExpense = { amount: 0, expenseName: "", category: "", date: new Date() };

    //* States
    const [expense, setExpense] = useState(initialExpense);
    const [previousAmount, setPreviousAmount] = useState(0);

    const [error, setError] = useState("");
    const { dispatch, state, remaininBudget } = useBudget();

    const [prevEditingId, setPrevEditingId] = useState<string>("");

    if (state.editingId !== prevEditingId) {
        setPrevEditingId(state.editingId);
        if (state.editingId) {
            const editingExpense = state.expenses.find((expense) => expense.id === state.editingId);
            if (editingExpense) {
                setExpense({
                    amount: editingExpense.amount,
                    expenseName: editingExpense.expenseName,
                    category: editingExpense.category,
                    date: editingExpense.date,
                });
                setPreviousAmount(editingExpense.amount);
            }
        } else {
            setExpense(initialExpense);
            setPreviousAmount(0);
        }
    }

    //* Funciones formulario
    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;

        const isAmountField = ["amount"].includes(name);

        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value,
        });
    };

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value as Date,
        });
    };

    const validForm = (): boolean => {
        if (Object.values(expense).includes("")) {
            setError("Todos los campos son obligatorios");
            return false;
        }

        if (expense.amount - previousAmount > remaininBudget) {
            setError("Ese gasto supera el presupuesto");
            return false;
        }

        return true;
    };

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar
        if (!validForm()) return;

        //Agregar un nuevo gasto
        if (state.editingId) {
            try {
                const updateDto = UpdateExpenseDtoImpl.create({
                    id: state.editingId,
                    expenseName: expense.expenseName,
                    amount: expense.amount,
                    category: expense.category,
                    date: expense.date,
                });
                const updatedExpense = updateExpenseUseCase.execute(updateDto);
                dispatch({ type: "update-expense", payload: { expense: updatedExpense } });
            } catch (e) {
                setError(e instanceof Error ? e.message : "Un error inesperado ocurrió");
                return;
            }
        } else {
            try {
                const createDto = CreateExpenseDtoImpl.create({
                    expenseName: expense.expenseName,
                    amount: expense.amount,
                    category: expense.category,
                    date: expense.date,
                });
                const newExpense = saveExpenseUseCase.execute(createDto);
                dispatch({ type: "add-expense", payload: { expense: newExpense } });
            } catch (e) {
                setError(e instanceof Error ? e.message : "Un error inesperado ocurrió");
                return;
            }
        }

        //Reiniciar el state
        setExpense(initialExpense);
        setPreviousAmount(0);
    };

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
                    <option value="" defaultValue={defaultCategories[0].id} disabled>
                        --- Seleccione Categoria ---
                    </option>
                    {defaultCategories.map((category) => (
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
