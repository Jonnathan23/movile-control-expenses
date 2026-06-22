import { BudgetRepository } from "src/features/expenses/core/domain/repositories/budget.repository";
import { BudgetEntity } from "src/features/expenses/core/domain/entities/budget.entity";

export class SaveBudgetUseCase {
    constructor(private readonly budgetRepository: BudgetRepository) {}

    public execute(amount: number): Promise<BudgetEntity> {
        return this.budgetRepository.saveBudget(amount);
    }
}
