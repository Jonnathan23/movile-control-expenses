import { MonthlyExpensesContext } from "src/shared/core/adapters/calculations/domain/context/monthly-expenses.context";
import type { MonthlyExpensesGenerator } from "src/shared/core/adapters/calculations/domain/interface/generators/monthly-expenses-generator.interface";
import type { MonthlyExpensesStrategy } from "src/shared/core/adapters/calculations/domain/interface/strategies/monthly-expenses-strategy.interface";

import { DefaultMonthlyExpensesStrategy } from "src/shared/core/adapters/calculations/infrastructure/strategies/default-monthly-expenses.strategy";

import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

export class MonthlyExpensesGeneratorSingleton implements MonthlyExpensesGenerator {
    private static instance: MonthlyExpensesGeneratorSingleton;
    private readonly featureContext: MonthlyExpensesContext;

    private constructor(strategy: MonthlyExpensesStrategy) {
        this.featureContext = new MonthlyExpensesContext(strategy);
    }

    public static getInstance(): MonthlyExpensesGeneratorSingleton {
        if (!MonthlyExpensesGeneratorSingleton.instance) {
            const defaultStrategy = new DefaultMonthlyExpensesStrategy();
            MonthlyExpensesGeneratorSingleton.instance = new MonthlyExpensesGeneratorSingleton(defaultStrategy);
        }
        return MonthlyExpensesGeneratorSingleton.instance;
    }

    public calculateMonthlyExpenses(transactions: TransactionEntity[]): number {
        return this.featureContext.calculateMonthlyExpenses(transactions);
    }

    public changeStrategy(strategy: MonthlyExpensesStrategy): void {
        this.featureContext.setStrategy(strategy);
    }
}
