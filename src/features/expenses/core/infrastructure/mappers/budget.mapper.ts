import { BudgetEntity } from "src/features/expenses/core/domain/entities/budget.entity";

export interface BudgetMapper {
    toEntity(rawObject: unknown): BudgetEntity;
}

export class BudgetMapperImpl implements BudgetMapper {
    public toEntity(rawObject: unknown): BudgetEntity {
        const amount = typeof rawObject === "number" ? rawObject : 0;
        return new BudgetEntity(amount);
    }
}
