import { useBudget } from "src/features/expenses/presentation/hooks/use-budget-context.hook";

export const useExpenseModal = () => {
    const { state, dispatch } = useBudget();

    const handleShowModal = () => {
        dispatch({ type: "show-modal" });
    };

    const handleCloseModal = () => {
        dispatch({ type: "close-modal" });
    };

    return {
        isModalOpen: state.modal,
        handleShowModal,
        handleCloseModal,
    };
};
