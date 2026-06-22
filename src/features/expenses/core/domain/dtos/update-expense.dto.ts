export interface UpdateExpenseDto {
    id: string;
    expenseName: string;
    amount: number;
    category: string;
    date: Date;
}

export class UpdateExpenseDtoImpl implements UpdateExpenseDto {
    private constructor(
        public readonly id: string,
        public readonly expenseName: string,
        public readonly amount: number,
        public readonly category: string,
        public readonly date: Date,
    ) {}

    static create(data: UpdateExpenseDto): UpdateExpenseDto {
        const { id, expenseName, amount, category, date } = data;

        if (!id || id.trim().length === 0) throw new Error("Missing or invalid id");
        if (!expenseName || expenseName.trim().length === 0) throw new Error("Missing or invalid expenseName");
        if (!amount || amount <= 0) throw new Error("Invalid amount");
        if (!category) throw new Error("Missing category");
        if (!date) throw new Error("Missing date");

        return new UpdateExpenseDtoImpl(id, expenseName, amount, category, date);
    }
}
