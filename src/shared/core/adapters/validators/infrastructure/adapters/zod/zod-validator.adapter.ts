import type { ZodSchema } from "zod";

import { CustomError } from "src/shared/core/errors/custom-error.error";

import type { EntityValidator } from "src/shared/core/adapters/validators/domain/interfaces/entity-validator.interface";

export class ZodValidatorAdapter<TExpectedEntity> implements EntityValidator<TExpectedEntity> {
    private readonly schema: ZodSchema<TExpectedEntity>;

    public constructor(schema: ZodSchema<TExpectedEntity>) {
        this.schema = schema;
    }

    public validate(rawData: unknown): TExpectedEntity {
        const validationResult = this.schema.safeParse(rawData);

        if (!validationResult.success) {
            const formattedErrors = validationResult.error.issues.map((issue) => issue.message).join(", ");

            throw CustomError.badRequest({
                payload: [
                    {
                        message: formattedErrors,
                        path: "",
                    },
                ],
                path: "Validations",
            });
        }

        return validationResult.data;
    }
}
