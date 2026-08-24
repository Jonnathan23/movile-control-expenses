import type { MonthlyExpensesStrategy } from "src/shared/core/adapters/calculations/domain/interface/strategies/monthly-expenses-strategy.interface";

import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

export class MonthlyExpensesContext implements MonthlyExpensesStrategy {
    private strategy!: MonthlyExpensesStrategy;

    public constructor(strategy: MonthlyExpensesStrategy) {
        this.setStrategy(strategy);
    }

    public setStrategy(strategy: MonthlyExpensesStrategy): void {
        this.strategy = strategy;
    }

    public calculateMonthlyExpenses(transactions: TransactionEntity[]): number {
        return this.strategy.calculateMonthlyExpenses(transactions);
    }
}
