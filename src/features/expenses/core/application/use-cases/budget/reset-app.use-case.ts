import { BudgetRepository } from "src/features/expenses/core/domain/repositories/budget.repository";

export class ResetAppUseCase {
    public constructor(private readonly budgetRepository: BudgetRepository) {}

    public execute(): Promise<void> {
        return this.budgetRepository.resetAll();
    }
}
