import { BudgetEntity } from "src/features/expenses/core/domain/entities/budget.entity";
import { BudgetRepository } from "src/features/expenses/core/domain/repositories/budget.repository";

import type { CreateBudgetDto } from "src/features/expenses/core/application/dtos/create-budget.dto";

export class SaveBudgetUseCase {
    public constructor(private readonly budgetRepository: BudgetRepository) {}

    public execute(createBudgetDto: CreateBudgetDto): Promise<BudgetEntity> {
        return this.budgetRepository.saveBudget(createBudgetDto);
    }
}
