import { BudgetRepository } from "src/features/expenses/core/domain/repositories/budget.repository";
import { BudgetDataSource } from "src/features/expenses/core/domain/datasources/budget.datasource";
import { BudgetEntity } from "src/features/expenses/core/domain/entities/budget.entity";

export class BudgetRepositoryImpl implements BudgetRepository {
    constructor(private readonly budgetDataSource: BudgetDataSource) {}

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
