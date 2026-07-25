import { MonthlyIncomeContext } from "src/shared/core/adapters/calculations/domain/context/monthly-income.context";
import type { MonthlyIncomeGenerator } from "src/shared/core/adapters/calculations/domain/interface/generators/monthly-income-generator.interface";
import type { MonthlyIncomeStrategy } from "src/shared/core/adapters/calculations/domain/interface/strategies/monthly-income-strategy.interface";

import { DefaultMonthlyIncomeStrategy } from "src/shared/core/adapters/calculations/infrastructure/strategies/default-monthly-income.strategy";

import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

export class MonthlyIncomeGeneratorSingleton implements MonthlyIncomeGenerator {
    private static instance: MonthlyIncomeGeneratorSingleton;
    private readonly featureContext: MonthlyIncomeContext;

    private constructor(strategy: MonthlyIncomeStrategy) {
        this.featureContext = new MonthlyIncomeContext(strategy);
    }

    public static getInstance(): MonthlyIncomeGeneratorSingleton {
        if (!MonthlyIncomeGeneratorSingleton.instance) {
            const defaultStrategy = new DefaultMonthlyIncomeStrategy();
            MonthlyIncomeGeneratorSingleton.instance = new MonthlyIncomeGeneratorSingleton(defaultStrategy);
        }
        return MonthlyIncomeGeneratorSingleton.instance;
    }

    public calculateMonthlyIncome(transactions: TransactionEntity[]): number {
        return this.featureContext.calculateMonthlyIncome(transactions);
    }

    public changeStrategy(strategy: MonthlyIncomeStrategy): void {
        this.featureContext.setStrategy(strategy);
    }
}
