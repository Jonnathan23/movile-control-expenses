import type { CreateBudgetDto } from "src/features/expenses/core/domain/dtos/create-budget.dto";
import { BudgetEntity } from "src/features/expenses/core/domain/entities/budget.entity";

export abstract class BudgetRepository {
    abstract getBudget(): Promise<BudgetEntity>;
    abstract saveBudget(createBudgetDto: CreateBudgetDto): Promise<BudgetEntity>;
    abstract resetAll(): Promise<void>;
}
