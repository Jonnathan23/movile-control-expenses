import type { CreateBudgetDto } from "src/features/expenses/core/domain/dtos/create-budget.dto";
import { BudgetEntity } from "src/features/expenses/core/domain/entities/budget.entity";

export abstract class BudgetRepository {
    public abstract getBudget(): Promise<BudgetEntity>;
    public abstract saveBudget(createBudgetDto: CreateBudgetDto): Promise<BudgetEntity>;
    public abstract resetAll(): Promise<void>;
}
