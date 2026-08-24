import { type ChangeEvent, type SyntheticEvent, useState } from "react";

import { useBudgetContext } from "src/features/transactions/presentation/hooks/use-budget-context.hook";
import { useCreateTransaction } from "src/features/transactions/presentation/hooks/use-cases/transactions/create-transaction.hook";
import { useUpdateTransaction } from "src/features/transactions/presentation/hooks/use-cases/transactions/update-transaction.hook";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface TransactionFormReturn {
    transaction: { amount: number; description: string; categoryId: string; date: Date };
    error: string;
    state: ReturnType<typeof useBudgetContext>["state"];
    handleChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    handleChangeDate: (value: Value) => void;
    handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
}

export const useTransactionForm = (): TransactionFormReturn => {
    const initialTransaction = { amount: 0, description: "", categoryId: "", date: new Date() };

    const [transaction, setTransaction] = useState(initialTransaction);
    const [previousAmount, setPreviousAmount] = useState(0);
    const [error, setError] = useState("");
    const [prevEditingId, setPrevEditingId] = useState<string>("");

    const { dispatch, state, remaininBudget } = useBudgetContext();
    const { executeMutation: saveTransaction } = useCreateTransaction({ dispatch });
    const { executeMutation: updateTransaction } = useUpdateTransaction({ dispatch });

    if (state.editingId !== prevEditingId) {
        setPrevEditingId(state.editingId);
        if (state.editingId) {
            const editingTransaction = state.transactions.find((e) => e.id === state.editingId);
            if (editingTransaction) {
                setTransaction({
                    amount: editingTransaction.amount,
                    description: editingTransaction.description,
                    categoryId: editingTransaction.categoryId,
                    date: editingTransaction.date,
                });
                setPreviousAmount(editingTransaction.amount);
            }
        } else {
            setTransaction(initialTransaction);
            setPreviousAmount(0);
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = event.target;
        const isAmountField = ["amount"].includes(name);

        setTransaction({
            ...transaction,
            [name]: isAmountField ? +value : value,
        });
    };

    const handleChangeDate = (value: Value): void => {
        setTransaction({
            ...transaction,
            date: value as Date,
        });
    };

    const validForm = (): boolean => {
        if (Object.values(transaction).includes("")) {
            setError("Todos los campos son obligatorios");
            return false;
        }

        if (transaction.amount - previousAmount > remaininBudget) {
            setError("Ese gasto supera el presupuesto");
            return false;
        }

        return true;
    };

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (!validForm()) return;

        if (state.editingId) {
            updateTransaction({
                id: state.editingId,
                data: {
                    description: transaction.description,
                    amount: transaction.amount,
                    categoryId: transaction.categoryId,
                    date: transaction.date,
                },
            });
        } else {
            saveTransaction({
                description: transaction.description,
                amount: transaction.amount,
                categoryId: transaction.categoryId,
                date: transaction.date,
            });
        }

        setTransaction(initialTransaction);
        setPreviousAmount(0);
        setError("");
    };

    return {
        transaction,
        error,
        state,
        handleChange,
        handleChangeDate,
        handleSubmit,
    };
};
