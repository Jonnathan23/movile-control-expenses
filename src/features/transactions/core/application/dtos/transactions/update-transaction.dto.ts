import type { EntityValidator } from "src/shared/core/adapters/validators/domain/interfaces/entity-validator.interface";

import { type TransactionType } from "src/features/transactions/core/domain/enums/transaction.enum";

export interface UpdateTransactionDto {
    type: TransactionType;
    amount: number;
    categoryId: string;
    categoryName: string;
    description: string;
    accountId: string;
    date: Date;
}

export class UpdateTransactionDtoImpl implements UpdateTransactionDto {
    public readonly type: TransactionType;
    public readonly amount: number;
    public readonly categoryId: string;
    public readonly categoryName: string;
    public readonly description: string;
    public readonly accountId: string;
    public readonly date: Date;

    private constructor(props: UpdateTransactionDto) {
        const { type, amount, categoryId, categoryName, description, accountId, date } = props;
        this.type = type;
        this.amount = amount;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.description = description;
        this.accountId = accountId;
        this.date = date;
    }

    public static create(data: unknown, validator: EntityValidator<UpdateTransactionDto>): UpdateTransactionDto {
        const validatedData = validator.validate(data);

        return new UpdateTransactionDtoImpl({
            type: validatedData.type,
            amount: validatedData.amount,
            categoryId: validatedData.categoryId,
            categoryName: validatedData.categoryName,
            description: validatedData.description,
            accountId: validatedData.accountId,
            date: validatedData.date,
        });
    }
}
