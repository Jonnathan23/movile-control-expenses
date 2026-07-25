import type { MonthlyIncomeStrategy } from "src/shared/core/adapters/calculations/domain/interface/strategies/monthly-income-strategy.interface";

export interface MonthlyIncomeGenerator extends MonthlyIncomeStrategy {
    changeStrategy(strategy: MonthlyIncomeStrategy): void;
}
