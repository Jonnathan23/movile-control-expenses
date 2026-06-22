export class ExpenseEntity {
    constructor(
        public readonly id: string,
        public readonly expenseName: string,
        public readonly amount: number,
        public readonly category: string,
        public readonly date: Date,
    ) {}
}
