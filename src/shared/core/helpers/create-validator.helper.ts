import { adapterValidatorGenerator } from "src/shared/core/adapters/validators/di/validator.dependencies";

export const createValidator = adapterValidatorGenerator.createValidator.bind(adapterValidatorGenerator);

export type ValidatorCreator = typeof createValidator;
