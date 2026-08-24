import { BudgetDataSource } from "src/features/transactions/core/domain/datasources/budget.datasource";
import { BudgetEntity } from "src/features/transactions/core/domain/entities/budget.entity";
import { BudgetRepository } from "src/features/transactions/core/domain/repositories/budget.repository";

import type { CreateBudgetDto } from "src/features/transactions/core/application/dtos/budget/create-budget.dto";

export class BudgetRepositoryImpl implements BudgetRepository {
    public constructor(private readonly budgetDataSource: BudgetDataSource) {}

    public getBudget(): Promise<BudgetEntity> {
        return this.budgetDataSource.getBudget();
    }

    public saveBudget(createBudgetDto: CreateBudgetDto): Promise<BudgetEntity> {
        return this.budgetDataSource.saveBudget(createBudgetDto);
    }

    public resetAll(): Promise<void> {
        return this.budgetDataSource.resetAll();
    }
}
