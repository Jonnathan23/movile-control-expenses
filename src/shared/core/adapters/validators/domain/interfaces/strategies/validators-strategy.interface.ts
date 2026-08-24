import type { EntityValidator } from "src/shared/core/adapters/validators/domain/interfaces/entity-validator.interface";

export interface ValidatorsStrategy {
    createValidator<TExpectedData>(schema: unknown): EntityValidator<TExpectedData>;
}
