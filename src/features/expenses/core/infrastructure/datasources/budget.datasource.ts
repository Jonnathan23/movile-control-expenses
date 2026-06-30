import { BudgetDataSource } from "src/features/expenses/core/domain/datasources/budget.datasource";
import { BudgetEntity } from "src/features/expenses/core/domain/entities/budget.entity";

import type { BudgetMapper } from "src/features/expenses/core/infrastructure/mappers/budget.mapper";

import type { CreateBudgetDto } from "src/features/expenses/core/application/dtos/create-budget.dto";

export class BudgetDataSourceImpl implements BudgetDataSource {
    private readonly storageKey = "budget";

    public constructor(private readonly budgetMapper: BudgetMapper) {}

    public async getBudget(): Promise<BudgetEntity> {
        const stored = localStorage.getItem(this.storageKey);
        const rawData = stored ? JSON.parse(stored) : 0;
        return this.budgetMapper.toEntity(rawData);
    }

    public async saveBudget(createBudgetDto: CreateBudgetDto): Promise<BudgetEntity> {
        localStorage.setItem(this.storageKey, JSON.stringify(createBudgetDto.amount));
        return new BudgetEntity(createBudgetDto.amount);
    }

    public async resetAll(): Promise<void> {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem("expenses");
    }
}
