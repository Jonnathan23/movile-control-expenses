import type { MonthlyExpensesStrategy } from "src/shared/core/adapters/calculations/domain/interface/strategies/monthly-expenses-strategy.interface";

export interface MonthlyExpensesGenerator extends MonthlyExpensesStrategy {
    changeStrategy(strategy: MonthlyExpensesStrategy): void;
}
