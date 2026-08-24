import { BudgetEntity } from "src/features/transactions/core/domain/entities/budget.entity";
import { BudgetRepository } from "src/features/transactions/core/domain/repositories/budget.repository";

import type { BudgetDtoFactory } from "src/features/transactions/core/application/factories/interfaces/budget-dto-factory.interface";

export class SaveBudgetUseCase {
    public constructor(
        private readonly budgetRepository: BudgetRepository,
        private readonly budgetDtoFactory: BudgetDtoFactory,
    ) {}

    public execute(rawData: unknown): Promise<BudgetEntity> {
        const dto = this.budgetDtoFactory.createCreateBudgetDto(rawData);

        return this.budgetRepository.saveBudget(dto);
    }
}
