import type { MonthlyIncomeStrategy } from "src/shared/core/adapters/calculations/domain/interface/strategies/monthly-income-strategy.interface";

import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

export class MonthlyIncomeContext implements MonthlyIncomeStrategy {
    private strategy!: MonthlyIncomeStrategy;

    public constructor(strategy: MonthlyIncomeStrategy) {
        this.setStrategy(strategy);
    }

    public setStrategy(strategy: MonthlyIncomeStrategy): void {
        this.strategy = strategy;
    }

    public calculateMonthlyIncome(transactions: TransactionEntity[]): number {
        return this.strategy.calculateMonthlyIncome(transactions);
    }
}
