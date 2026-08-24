import type { EntityValidator } from "src/shared/core/adapters/validators/domain/interfaces/entity-validator.interface";

import type { CreateBudgetDto } from "src/features/transactions/core/application/dtos/budget/create-budget.dto";

export interface BudgetValidatorContainer {
    createBudgetValidator: EntityValidator<CreateBudgetDto>;
}
