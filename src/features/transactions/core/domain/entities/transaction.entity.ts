import type { TransactionType } from "src/features/transactions/core/domain/enums/transaction.enum";

export class TransactionEntity {
    public constructor(
        public readonly id: string,
        public readonly type: TransactionType,
        public readonly amount: number,
        public readonly categoryId: string,
        public readonly categoryName: string,
        public readonly description: string,
        public readonly accountId: string,
        public readonly date: Date,
    ) {}
}
