export interface CreateBudgetDto {
    amount: number;
}

export class CreateBudgetDtoImpl implements CreateBudgetDto {
    private constructor(public readonly amount: number) {}

    public static create(data: CreateBudgetDto): CreateBudgetDto {
        const { amount } = data;

        if (!amount || amount <= 0) throw new Error("Invalid amount");

        return new CreateBudgetDtoImpl(amount);
    }
}
