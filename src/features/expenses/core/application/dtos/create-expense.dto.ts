import { z } from "zod";

import { CustomError } from "src/shared/core/errors/custom-error.error";

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
        const validatedData = CreateExpenseDtoImpl.validate(data);
        return new CreateExpenseDtoImpl(
            validatedData.expenseName,
            validatedData.amount,
            validatedData.category,
            validatedData.date,
        );
    }

    private static validate(data: CreateExpenseDto): CreateExpenseDto {
        const createExpenseSchema = z.object({
            expenseName: z.string().trim().min(1, "Missing or invalid expenseName"),
            amount: z.number().positive("Invalid amount"),
            category: z.string().min(1, "Missing category"),
            date: z.date({ message: "Missing date" }),
        });

        const result = createExpenseSchema.safeParse(data);

        if (!result.success) {
            const payload = result.error.issues.map((err) => ({
                message: err.message,
                path: err.path.join("."),
            }));
            throw CustomError.badRequest({ payload, path: "CreateExpenseDto" });
        }

        return result.data;
    }
}
