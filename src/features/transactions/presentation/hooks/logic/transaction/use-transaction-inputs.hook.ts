import type { ChangeEvent, FocusEvent } from "react";
import { useContext } from "react";

import type { CategoryEntity } from "src/features/transactions/core/domain/entities/category.entity";
import type { TransactionType } from "src/features/transactions/core/domain/enums/transaction.enum";

import { TransactionFormContext } from "src/features/transactions/presentation/context/transaction-form.context";
import type { CurriedActionHandler } from "src/features/transactions/presentation/types/event-handlers.type";

export interface UseTransactionInputsReturn {
    txType: TransactionType;
    categoryId: string;
    description: string;
    date: string;
    categories: CategoryEntity[];
    handleTxTypeClick: CurriedActionHandler<TransactionType>;
    handleCategoryClick: CurriedActionHandler<string>;
    handleDescriptionChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleInputFocus: (e: FocusEvent<HTMLInputElement>) => void;
    handleInputBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

export const useTransactionInputs = (): UseTransactionInputsReturn => {
    const { state, dispatch, categories } = useContext(TransactionFormContext);

    const handleTxTypeClick: CurriedActionHandler<TransactionType> = (type) => () => {
        dispatch({ type: "set-tx-type", payload: { txType: type } });
    };

    const handleCategoryClick: CurriedActionHandler<string> = (id) => () => {
        dispatch({ type: "set-category", payload: { categoryId: id } });
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>): void => {
        dispatch({ type: "set-description", payload: { description: e.target.value } });
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
        dispatch({ type: "set-date", payload: { date: e.target.value } });
    };

    const handleInputFocus = (e: FocusEvent<HTMLInputElement>): void => {
        e.target.style.borderColor = "#26a09b";
    };

    const handleInputBlur = (e: FocusEvent<HTMLInputElement>): void => {
        e.target.style.borderColor = "rgba(38,160,155,0.25)";
    };

    return {
        txType: state.txType,
        categoryId: state.categoryId,
        description: state.description,
        date: state.date,
        categories,
        handleTxTypeClick,
        handleCategoryClick,
        handleDescriptionChange,
        handleDateChange,
        handleInputFocus,
        handleInputBlur,
    };
};
