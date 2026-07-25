import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

export interface MonthlyExpensesStrategy {
    calculateMonthlyExpenses(transactions: TransactionEntity[]): number;
}
