import type { TransactionType } from "src/features/transactions/core/domain/enums/transaction.enum";

interface TransactionEntityProps {
    id: string;
    type: TransactionType;
    amount: number;
    categoryId: string;
    categoryName: string;
    description: string;
    accountId: string;
    date: Date;
}

export class TransactionEntity {
    public readonly id: string;
    public readonly type: TransactionType;
    public readonly amount: number;
    public readonly categoryId: string;
    public readonly categoryName: string;
    public readonly description: string;
    public readonly accountId: string;
    public readonly date: Date;

    public constructor(props: TransactionEntityProps) {
        const { id, type, amount, categoryId, categoryName, description, accountId, date } = props;

        this.id = id;
        this.type = type;
        this.amount = amount;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.description = description;
        this.accountId = accountId;
        this.date = date;
    }
}
