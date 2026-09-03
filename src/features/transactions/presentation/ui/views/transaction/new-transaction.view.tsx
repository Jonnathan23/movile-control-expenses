/* eslint-disable react/jsx-handler-names */
import type { AccountEntity } from "src/features/accounts/core/domain/entities/account.entity";

import { TransactionFormProvider } from "src/features/transactions/presentation/provider/transaction-form.provider";
import { TransactionAccountSelector } from "src/features/transactions/presentation/ui/components/transaction/new-form/transaction-account-selector";
import { TransactionAmountDisplay } from "src/features/transactions/presentation/ui/components/transaction/new-form/transaction-amount-display";
import { TransactionCategorySelector } from "src/features/transactions/presentation/ui/components/transaction/new-form/transaction-category-selector";
import { TransactionFormInputs } from "src/features/transactions/presentation/ui/components/transaction/new-form/transaction-form-inputs";
import { TransactionHeader } from "src/features/transactions/presentation/ui/components/transaction/new-form/transaction-header";
import { TransactionNumericKeypad } from "src/features/transactions/presentation/ui/components/transaction/new-form/transaction-numeric-keypad";
import { TransactionSaveButton } from "src/features/transactions/presentation/ui/components/transaction/new-form/transaction-save-button";
import { TransactionTypeToggle } from "src/features/transactions/presentation/ui/components/transaction/new-form/transaction-type-toggle";

interface NewExpenseViewProps {
    readonly accounts: AccountEntity[];
    readonly onClose: () => void;
}

export function NewTransactionView({ accounts, onClose }: NewExpenseViewProps) {
    return (
        <TransactionFormProvider accounts={accounts} onClose={onClose}>
            <div className="flex flex-col min-h-full animate-slide-up">
                <TransactionHeader />

                <div className="flex-1 overflow-y-auto px-5 pb-32 space-y-5 hide-scrollbar">
                    <TransactionTypeToggle />

                    <TransactionAccountSelector />

                    <TransactionCategorySelector />

                    <TransactionFormInputs />

                    <TransactionAmountDisplay />

                    <TransactionNumericKeypad />
                </div>

                <TransactionSaveButton />
            </div>
        </TransactionFormProvider>
    );
}
