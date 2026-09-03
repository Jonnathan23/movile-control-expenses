import { type ReactNode, useMemo, useReducer } from "react";

import type { AccountEntity } from "src/features/accounts/core/domain/entities/account.entity";

import { TransactionFormContext } from "src/features/transactions/presentation/context/transaction-form.context";
import { useGetCategories } from "src/features/transactions/presentation/hooks/use-cases/categories/get-categories.hook";
import type { TransactionFormState } from "src/features/transactions/presentation/reducers/transaction-form.reducer";
import { transactionFormReducer } from "src/features/transactions/presentation/reducers/transaction-form.reducer";

interface TransactionFormProviderProps {
    readonly children: ReactNode;
    readonly accounts: AccountEntity[];
    readonly onClose: () => void;
}

const ISO_DATE_LENGTH = 10;

export const TransactionFormProvider = ({ children, accounts, onClose }: TransactionFormProviderProps) => {
    const { data: categories = [] } = useGetCategories();

    const initialState: TransactionFormState = {
        txType: "expense",
        amount: "",
        categoryId: "",
        description: "",
        date: new Date().toISOString().slice(0, ISO_DATE_LENGTH),
        selectedAccount: accounts[0]?.id ?? "",
        isAccountOpen: false,
        error: "",
    };

    const [state, dispatch] = useReducer(transactionFormReducer, initialState);

    const contextValue = useMemo(
        () => ({ state, dispatch, categories, accounts, onClose }),
        [state, dispatch, categories, accounts, onClose],
    );

    return <TransactionFormContext.Provider value={contextValue}>{children}</TransactionFormContext.Provider>;
};
