import { createContext, type Dispatch } from "react";

import type { AccountEntity } from "src/features/accounts/core/domain/entities/account.entity";
import type { CategoryEntity } from "src/features/transactions/core/domain/entities/category.entity";

import type {
    TransactionFormActions,
    TransactionFormState,
} from "src/features/transactions/presentation/reducers/transaction-form.reducer";

export type TransactionFormContextProps = {
    state: TransactionFormState;
    dispatch: Dispatch<TransactionFormActions>;
    categories: CategoryEntity[];
    accounts: AccountEntity[];
    onClose: () => void;
};

export const TransactionFormContext = createContext<TransactionFormContextProps>(null!);
