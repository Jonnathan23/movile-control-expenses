import type { z, ZodSchema, ZodTypeAny } from "zod";

import type { EntityValidator } from "src/shared/core/adapters/validators/domain/interfaces/entity-validator.interface";
import type { ValidatorsStrategy } from "src/shared/core/adapters/validators/domain/interfaces/strategies/validators-strategy.interface";

import { ZodValidatorAdapter } from "src/shared/core/adapters/validators/infrastructure/adapters/zod/zod-validator.adapter";

export type InferSchema<T extends ZodTypeAny> = z.infer<T>;

export class ZodValidatorsStrategy implements ValidatorsStrategy {
    public createValidator<TExpectedData>(schema: unknown): EntityValidator<TExpectedData> {
        const zodSchema = schema as ZodSchema<TExpectedData>;

        return new ZodValidatorAdapter<TExpectedData>(zodSchema);
    }
}
