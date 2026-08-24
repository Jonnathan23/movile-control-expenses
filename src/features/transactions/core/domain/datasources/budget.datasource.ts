import { BudgetEntity } from "src/features/transactions/core/domain/entities/budget.entity";

import type { CreateBudgetDto } from "src/features/transactions/core/application/dtos/budget/create-budget.dto";

export abstract class BudgetDataSource {
    public abstract getBudget(): Promise<BudgetEntity>;
    public abstract saveBudget(createBudgetDto: CreateBudgetDto): Promise<BudgetEntity>;
    public abstract resetAll(): Promise<void>;
}
