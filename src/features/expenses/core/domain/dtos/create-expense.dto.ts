export interface CreateExpenseDto {
    expenseName: string;
    amount: number;
    category: string;
    date: Date;
}

export class CreateExpenseDtoImpl implements CreateExpenseDto {
    private constructor(
        public readonly expenseName: string,
        public readonly amount: number,
        public readonly category: string,
        public readonly date: Date,
    ) {}

    public static create(data: CreateExpenseDto): CreateExpenseDto {
        const { expenseName, amount, category, date } = data;

        if (!expenseName || expenseName.trim().length === 0) throw new Error("Missing or invalid expenseName");
        if (!amount || amount <= 0) throw new Error("Invalid amount");
        if (!category) throw new Error("Missing category");
        if (!date) throw new Error("Missing date");

        return new CreateExpenseDtoImpl(expenseName, amount, category, date);
    }
}
