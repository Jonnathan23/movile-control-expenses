import { z } from "zod";

import { CustomError } from "src/shared/core/errors/custom-error.error";

import { TRANSACTION_TYPE, type TransactionType } from "src/features/transactions/core/domain/enums/transaction.enum";

export interface UpdateTransactionDto {
    id: string;
    type: TransactionType;
    amount: number;
    category: string;
    description: string;
    accountId: string;
    date: Date;
}

export class UpdateTransactionDtoImpl implements UpdateTransactionDto {
    private constructor(
        public readonly id: string,
        public readonly type: TransactionType,
        public readonly amount: number,
        public readonly category: string,
        public readonly description: string,
        public readonly accountId: string,
        public readonly date: Date,
    ) {}

    public static create(data: UpdateTransactionDto): UpdateTransactionDto {
        const validatedData = UpdateTransactionDtoImpl.validate(data);
        return new UpdateTransactionDtoImpl(
            validatedData.id,
            validatedData.type,
            validatedData.amount,
            validatedData.category,
            validatedData.description,
            validatedData.accountId,
            validatedData.date,
        );
    }

    private static validate(data: UpdateTransactionDto): UpdateTransactionDto {
        const updateTransactionSchema = z.object({
            id: z.string().trim().min(1, "Missing or invalid id"),
            type: z.nativeEnum(TRANSACTION_TYPE).or(z.enum(["income", "expense"])),
            amount: z.number().positive("Invalid amount"),
            category: z.string().min(1, "Missing category"),
            description: z.string().trim().min(1, "Missing or invalid description"),
            accountId: z.string().min(1, "Missing accountId"),
            date: z.date({ message: "Missing date" }),
        });

        const result = updateTransactionSchema.safeParse(data);

        if (!result.success) {
            const payload = result.error.issues.map((err) => ({
                message: err.message,
                path: err.path.join("."),
            }));
            throw CustomError.badRequest({ payload, path: "UpdateTransactionDto" });
        }

        return result.data;
    }
}
