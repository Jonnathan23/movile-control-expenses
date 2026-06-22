import { BudgetRepository } from "src/features/expenses/core/domain/repositories/budget.repository";
import { BudgetEntity } from "src/features/expenses/core/domain/entities/budget.entity";

export class GetBudgetUseCase {
    constructor(private readonly budgetRepository: BudgetRepository) {}

    public execute(): BudgetEntity {
        return this.budgetRepository.getBudget();
    }
}
