import { useContext } from "react";

import { TransactionFormContext } from "src/features/transactions/presentation/context/transaction-form.context";
import { useBudgetContext } from "src/features/transactions/presentation/hooks/use-budget-context.hook";
import { useCreateTransaction } from "src/features/transactions/presentation/hooks/use-cases/transactions/create-transaction.hook";

const TIME_STRING_LENGTH = 8;

export interface UseTransactionSubmitReturn {
    isExpense: boolean;
    isSaveDisabled: boolean;
    buttonText: string;
    handleSaveClick: () => void;
}

export const useTransactionSubmit = (): UseTransactionSubmitReturn => {
    const { state, dispatch: dispatchTransaction, categories, onClose } = useContext(TransactionFormContext);
    const { dispatch: budgetDispatch } = useBudgetContext();
    const { executeMutation: createTransaction, isPending } = useCreateTransaction({
        dispatch: budgetDispatch,
        dispatchTransaction,
        onClose,
    });

    const numAmount = Number.parseFloat(state.amount);
    const isValidAmount = state.amount !== "" && !Number.isNaN(numAmount) && numAmount > 0;
    const isSaveDisabled = isPending || !isValidAmount;
    const isExpense = state.txType === "expense";

    let buttonText = isExpense ? "Guardar Gasto" : "Guardar Ingreso";
    if (isPending) buttonText = "Guardando...";

    const handleSaveClick = (): void => {
        if (isSaveDisabled) return;

        const selectedCategory = categories.find((c) => c.id === state.categoryId) ?? categories[0];

        if (!selectedCategory) {
            dispatchTransaction({ type: "set-error", payload: { error: "Categoría inválida" } });
            return;
        }

        dispatchTransaction({ type: "set-error", payload: { error: "" } });
        createTransaction({
            type: state.txType,
            amount: numAmount,
            categoryId: selectedCategory.id,
            categoryName: selectedCategory.name,
            description: state.description !== "" ? state.description : selectedCategory.name,
            accountId: state.selectedAccount,
            date: new Date(state.date + "T" + new Date().toTimeString().slice(0, TIME_STRING_LENGTH)),
        });
    };

    return {
        isExpense,
        isSaveDisabled,
        buttonText,
        handleSaveClick,
    };
};
