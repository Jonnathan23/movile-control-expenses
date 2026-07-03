import { useBudgetContext } from "src/features/expenses/presentation/hooks/use-budget-context.hook";

interface ExpenseModalReturn {
    isModalOpen: boolean;
    handleShowModal: () => void;
    handleCloseModal: () => void;
}

export const useExpenseModal = (): ExpenseModalReturn => {
    const { state, dispatch } = useBudgetContext();

    const handleShowModal = (): void => {
        dispatch({ type: "show-modal" });
    };

    const handleCloseModal = (): void => {
        dispatch({ type: "close-modal" });
    };

    return {
        isModalOpen: state.modal,
        handleShowModal,
        handleCloseModal,
    };
};
