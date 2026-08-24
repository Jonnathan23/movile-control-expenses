import { useBudgetContext } from "src/features/transactions/presentation/hooks/use-budget-context.hook";

interface TransactionModalReturn {
    isModalOpen: boolean;
    handleShowModal: () => void;
    handleCloseModal: () => void;
}

export const useTransactionModal = (): TransactionModalReturn => {
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
