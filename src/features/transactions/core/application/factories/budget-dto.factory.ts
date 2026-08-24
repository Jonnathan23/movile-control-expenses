import type { EntityValidator } from "src/shared/core/adapters/validators/domain/interfaces/entity-validator.interface";

import {
    type CreateBudgetDto,
    CreateBudgetDtoImpl,
} from "src/features/transactions/core/application/dtos/budget/create-budget.dto";
import type { BudgetDtoFactory } from "src/features/transactions/core/application/factories/interfaces/budget-dto-factory.interface";

export class BudgetDtoFactoryImpl implements BudgetDtoFactory {
    public constructor(private readonly createValidator: EntityValidator<CreateBudgetDto>) {}

    public createCreateBudgetDto(rawData: unknown): CreateBudgetDto {
        return CreateBudgetDtoImpl.create(rawData, this.createValidator);
    }
}
