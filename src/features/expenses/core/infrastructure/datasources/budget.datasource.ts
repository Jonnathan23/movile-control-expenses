import { BudgetDataSource } from "src/features/expenses/core/domain/datasources/budget.datasource";
import { BudgetEntity } from "src/features/expenses/core/domain/entities/budget.entity";
import type { BudgetMapper } from "src/features/expenses/core/infrastructure/mappers/budget.mapper";

export class BudgetDataSourceImpl implements BudgetDataSource {
    private readonly STORAGE_KEY = "budget";

    constructor(private readonly budgetMapper: BudgetMapper) {}

    public getBudget(): BudgetEntity {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        const rawData = stored ? JSON.parse(stored) : 0;
        return this.budgetMapper.toEntity(rawData);
    }

    public saveBudget(amount: number): BudgetEntity {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(amount));
        return new BudgetEntity(amount);
    }

    public resetAll(): void {
        localStorage.removeItem(this.STORAGE_KEY);
        localStorage.removeItem("expenses"); // Clears both budget and expenses
    }
}
