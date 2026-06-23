import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useBudget } from "src/features/expenses/presentation/hooks/use-budget-context.hook";
import { useSaveExpense } from "src/features/expenses/presentation/hooks/use-cases/expenses/save-expense.hook";
import { useUpdateExpense } from "src/features/expenses/presentation/hooks/use-cases/expenses/update-expense.hook";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const useExpenseForm = () => {
    const initialExpense = { amount: 0, expenseName: "", category: "", date: new Date() };

    const [expense, setExpense] = useState(initialExpense);
    const [previousAmount, setPreviousAmount] = useState(0);
    const [error, setError] = useState("");
    const [prevEditingId, setPrevEditingId] = useState<string>("");

    const { dispatch, state, remaininBudget } = useBudget();
    const { executeMutation: saveExpense } = useSaveExpense({ dispatch });
    const { executeMutation: updateExpense } = useUpdateExpense({ dispatch });

    if (state.editingId !== prevEditingId) {
        setPrevEditingId(state.editingId);
        if (state.editingId) {
            const editingExpense = state.expenses.find((e) => e.id === state.editingId);
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

        if (!validForm()) return;

        if (state.editingId) {
            updateExpense({
                id: state.editingId,
                expenseName: expense.expenseName,
                amount: expense.amount,
                category: expense.category,
                date: expense.date,
            });
        } else {
            saveExpense({
                expenseName: expense.expenseName,
                amount: expense.amount,
                category: expense.category,
                date: expense.date,
            });
        }

        setExpense(initialExpense);
        setPreviousAmount(0);
        setError("");
    };

    return {
        expense,
        error,
        state,
        handleChange,
        handleChangeDate,
        handleSubmit,
    };
};
