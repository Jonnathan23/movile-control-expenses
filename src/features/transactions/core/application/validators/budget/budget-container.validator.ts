import type { ValidatorCreator } from "src/shared/core/helpers/create-validator.helper";

import type { CreateBudgetDto } from "src/features/transactions/core/application/dtos/budget/create-budget.dto";
import type { BudgetValidatorContainer } from "src/features/transactions/core/application/validators/budget/interfaces/container-response.interface";
import type { GenerateValidatorBudgetContainer } from "src/features/transactions/core/application/validators/budget/interfaces/generate-container.interface";
import { CreateBudgeValidatetSchema } from "src/features/transactions/core/application/validators/budget/schemas/create-budget.schema";

export class BudgetZodValidatorContainer implements GenerateValidatorBudgetContainer {
    public constructor(private readonly validatorCreator: ValidatorCreator) {}

    public generateBudgetValidators(): BudgetValidatorContainer {
        const createBudgetValidator = this.validatorCreator<CreateBudgetDto>(CreateBudgeValidatetSchema);

        return {
            createBudgetValidator,
        };
    }
}
