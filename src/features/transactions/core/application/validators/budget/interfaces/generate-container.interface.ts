import type { BudgetValidatorContainer } from "src/features/transactions/core/application/validators/budget/interfaces/container-response.interface";

export abstract class GenerateValidatorBudgetContainer {
    public abstract generateBudgetValidators(): BudgetValidatorContainer;
}
