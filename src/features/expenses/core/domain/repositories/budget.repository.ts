import { BudgetEntity } from "src/features/expenses/core/domain/entities/budget.entity";

export abstract class BudgetRepository {
    abstract getBudget(): BudgetEntity;
    abstract saveBudget(amount: number): BudgetEntity;
    abstract resetAll(): void;
}
