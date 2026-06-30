import { BudgetEntity } from "src/features/expenses/core/domain/entities/budget.entity";
import { BudgetRepository } from "src/features/expenses/core/domain/repositories/budget.repository";

export class GetBudgetUseCase {
    public constructor(private readonly budgetRepository: BudgetRepository) {}

    public execute(): Promise<BudgetEntity> {
        return this.budgetRepository.getBudget();
    }
}
