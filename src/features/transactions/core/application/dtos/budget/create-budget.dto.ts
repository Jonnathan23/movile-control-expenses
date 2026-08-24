import type { EntityValidator } from "src/shared/core/adapters/validators/domain/interfaces/entity-validator.interface";

export interface CreateBudgetDto {
    amount: number;
}

export class CreateBudgetDtoImpl implements CreateBudgetDto {
    public readonly amount: number;

    private constructor(props: CreateBudgetDto) {
        const { amount } = props;

        this.amount = amount;
    }

    public static create(data: unknown, validator: EntityValidator<CreateBudgetDto>): CreateBudgetDto {
        const validatedData = validator.validate(data);

        return new CreateBudgetDtoImpl(validatedData);
    }
}
