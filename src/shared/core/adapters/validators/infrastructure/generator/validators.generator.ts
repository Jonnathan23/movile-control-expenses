import { ValidatorsContext } from "src/shared/core/adapters/validators/domain/context/validator.context";
import type { ValidatorsGenerator } from "src/shared/core/adapters/validators/domain/generator/validator.generator";
import type { EntityValidator } from "src/shared/core/adapters/validators/domain/interfaces/entity-validator.interface";
import type { ValidatorsStrategy } from "src/shared/core/adapters/validators/domain/interfaces/strategies/validators-strategy.interface";

import { ZodValidatorsStrategy } from "src/shared/core/adapters/validators/infrastructure/strategies/zod-validator.strategy";

export class ValidatorsGeneratorSingleton implements ValidatorsGenerator {
    private static instance: ValidatorsGeneratorSingleton;
    private readonly validatorsContext: ValidatorsContext;

    private constructor(strategy: ValidatorsStrategy) {
        this.validatorsContext = new ValidatorsContext(strategy);
    }

    public static getInstance(): ValidatorsGeneratorSingleton {
        if (!ValidatorsGeneratorSingleton.instance) {
            const defaultStrategy = new ZodValidatorsStrategy();
            ValidatorsGeneratorSingleton.instance = new ValidatorsGeneratorSingleton(defaultStrategy);
        }

        return ValidatorsGeneratorSingleton.instance;
    }

    public createValidator<TExpectedData>(schema: unknown): EntityValidator<TExpectedData> {
        return this.validatorsContext.createValidator<TExpectedData>(schema);
    }

    public changeStrategy(strategy: ValidatorsStrategy): void {
        this.validatorsContext.setStrategy(strategy);
    }
}
