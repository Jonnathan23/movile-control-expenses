import { BudgetEntity } from "src/features/expenses/core/domain/entities/budget.entity";

import type { CreateBudgetDto } from "src/features/expenses/core/application/dtos/create-budget.dto";

export abstract class BudgetDataSource {
    public abstract getBudget(): Promise<BudgetEntity>;
    public abstract saveBudget(createBudgetDto: CreateBudgetDto): Promise<BudgetEntity>;
    public abstract resetAll(): Promise<void>;
}
