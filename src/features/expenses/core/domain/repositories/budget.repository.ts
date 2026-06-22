import { BudgetEntity } from "src/features/expenses/core/domain/entities/budget.entity";

export abstract class BudgetRepository {
    abstract getBudget(): Promise<BudgetEntity>;
    abstract saveBudget(amount: number): Promise<BudgetEntity>;
    abstract resetAll(): Promise<void>;
}
