import type { EntityValidator } from "src/shared/core/adapters/validators/domain/interfaces/entity-validator.interface";
import type { ValidatorsStrategy } from "src/shared/core/adapters/validators/domain/interfaces/strategies/validators-strategy.interface";

export class ValidatorsContext implements ValidatorsStrategy {
    private strategy!: ValidatorsStrategy;

    public constructor(strategy: ValidatorsStrategy) {
        this.setStrategy(strategy);
    }

    public setStrategy(strategy: ValidatorsStrategy): void {
        this.strategy = strategy;
    }

    public createValidator<TExpectedData>(schema: unknown): EntityValidator<TExpectedData> {
        return this.strategy.createValidator<TExpectedData>(schema);
    }
}
