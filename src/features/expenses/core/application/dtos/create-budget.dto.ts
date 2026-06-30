import { z } from "zod";

import { CustomError } from "src/shared/core/errors/custom-error.error";

export interface CreateBudgetDto {
    amount: number;
}

export class CreateBudgetDtoImpl implements CreateBudgetDto {
    private constructor(public readonly amount: number) {}

    public static create(data: CreateBudgetDto): CreateBudgetDto {
        const validatedData = CreateBudgetDtoImpl.validate(data);
        return new CreateBudgetDtoImpl(validatedData.amount);
    }

    private static validate(data: CreateBudgetDto): CreateBudgetDto {
        const createBudgetSchema = z.object({
            amount: z.number().positive("Invalid amount"),
        });

        const result = createBudgetSchema.safeParse(data);

        if (!result.success) {
            const payload = result.error.issues.map((err) => ({
                message: err.message,
                path: err.path.join("."),
            }));
            throw CustomError.badRequest({ payload, path: "CreateBudgetDto" });
        }

        return result.data;
    }
}
