import type { CreateBudgetDto } from "src/features/transactions/core/application/dtos/budget/create-budget.dto";

export interface BudgetDtoFactory {
    createCreateBudgetDto(rawData: unknown): CreateBudgetDto;
}
