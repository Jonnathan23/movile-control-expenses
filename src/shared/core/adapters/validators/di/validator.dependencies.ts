import type { ValidatorsGenerator } from "src/shared/core/adapters/validators/domain/generator/validator.generator";

import { ValidatorsGeneratorSingleton } from "src/shared/core/adapters/validators/infrastructure/generator/validators.generator";

export const adapterValidatorGenerator: ValidatorsGenerator = ValidatorsGeneratorSingleton.getInstance();
