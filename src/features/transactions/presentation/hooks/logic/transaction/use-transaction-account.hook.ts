import { useContext } from "react";

import type { AccountEntity } from "src/features/accounts/core/domain/entities/account.entity";

import { TransactionFormContext } from "src/features/transactions/presentation/context/transaction-form.context";
import type { CurriedActionHandler } from "src/features/transactions/presentation/types/event-handlers.type";

export interface UseTransactionAccountReturn {
    accounts: AccountEntity[];
    currentAccount: AccountEntity | undefined;
    isAccountOpen: boolean;
    handleAccountToggleClick: () => void;
    handleAccountClick: CurriedActionHandler<string>;
}

export const useTransactionAccount = (): UseTransactionAccountReturn => {
    const { state, dispatch, accounts } = useContext(TransactionFormContext);

    const currentAccount = accounts.find((accountData) => accountData.id === state.selectedAccount);

    const handleAccountToggleClick = (): void => {
        dispatch({ type: "toggle-account-selector" });
    };

    const handleAccountClick: CurriedActionHandler<string> = (id) => () => {
        dispatch({ type: "set-account", payload: { selectedAccount: id } });
        dispatch({ type: "toggle-account-selector" });
    };

    return {
        accounts,
        currentAccount,
        isAccountOpen: state.isAccountOpen,
        handleAccountToggleClick,
        handleAccountClick,
    };
};
