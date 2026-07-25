import { z } from "zod";

import { CustomError } from "src/shared/core/errors/custom-error.error";

import { TRANSACTION_TYPE, type TransactionType } from "src/features/transactions/core/domain/enums/transaction.enum";

export interface CreateTransactionDto {
    type: TransactionType;
    amount: number;
    category: string;
    description: string;
    accountId: string;
    date: Date;
}

export class CreateTransactionDtoImpl implements CreateTransactionDto {
    private constructor(
        public readonly type: TransactionType,
        public readonly amount: number,
        public readonly category: string,
        public readonly description: string,
        public readonly accountId: string,
        public readonly date: Date,
    ) {}

    public static create(data: CreateTransactionDto): CreateTransactionDto {
        const validatedData = CreateTransactionDtoImpl.validate(data);
        return new CreateTransactionDtoImpl(
            validatedData.type,
            validatedData.amount,
            validatedData.category,
            validatedData.description,
            validatedData.accountId,
            validatedData.date,
        );
    }

    private static validate(data: CreateTransactionDto): CreateTransactionDto {
        const createTransactionSchema = z.object({
            type: z.nativeEnum(TRANSACTION_TYPE).or(z.enum(["income", "expense"])),
            amount: z.number().positive("Invalid amount"),
            category: z.string().min(1, "Missing category"),
            description: z.string().trim().min(1, "Missing or invalid description"),
            accountId: z.string().min(1, "Missing accountId"),
            date: z.date({ message: "Missing date" }),
        });

        const result = createTransactionSchema.safeParse(data);

        if (!result.success) {
            const payload = result.error.issues.map((err) => ({
                message: err.message,
                path: err.path.join("."),
            }));
            throw CustomError.badRequest({ payload, path: "CreateTransactionDto" });
        }

        return result.data;
    }
}
