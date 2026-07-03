import { z } from "zod";

import { CustomError } from "src/shared/core/errors/custom-error.error";

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

    public static create(data: UpdateExpenseDto): UpdateExpenseDto {
        const validatedData = UpdateExpenseDtoImpl.validate(data);
        return new UpdateExpenseDtoImpl(
            validatedData.id,
            validatedData.expenseName,
            validatedData.amount,
            validatedData.category,
            validatedData.date,
        );
    }

    private static validate(data: UpdateExpenseDto): UpdateExpenseDto {
        const updateExpenseSchema = z.object({
            id: z.string().trim().min(1, "Missing or invalid id"),
            expenseName: z.string().trim().min(1, "Missing or invalid expenseName"),
            amount: z.number().positive("Invalid amount"),
            category: z.string().min(1, "Missing category"),
            date: z.date({ message: "Missing date" }),
        });

        const result = updateExpenseSchema.safeParse(data);

        if (!result.success) {
            const payload = result.error.issues.map((err) => ({
                message: err.message,
                path: err.path.join("."),
            }));
            throw CustomError.badRequest({ payload, path: "UpdateExpenseDto" });
        }

        return result.data;
    }
}
