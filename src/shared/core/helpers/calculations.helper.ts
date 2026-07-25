import {
    adapterMonthlyExpensesGenerator,
    adapterMonthlyIncomeGenerator,
    adapterTotalNetGenerator,
} from "src/shared/core/adapters/calculations/di/calculations.dependencies";

import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

import type { AccountEntity } from "src/features/accounts/core/entities/account.entity";

export const calculateTotalNet = (accounts: AccountEntity[]): number => {
    return adapterTotalNetGenerator.calculateTotalNet(accounts);
};

export const calculateMonthlyExpenses = (transactions: TransactionEntity[]): number => {
    return adapterMonthlyExpensesGenerator.calculateMonthlyExpenses(transactions);
};

export const calculateMonthlyIncome = (transactions: TransactionEntity[]): number => {
    return adapterMonthlyIncomeGenerator.calculateMonthlyIncome(transactions);
};
