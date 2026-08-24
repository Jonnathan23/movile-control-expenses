import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

export interface MonthlyIncomeStrategy {
    calculateMonthlyIncome(transactions: TransactionEntity[]): number;
}
