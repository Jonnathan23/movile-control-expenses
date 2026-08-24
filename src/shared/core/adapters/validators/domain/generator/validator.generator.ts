import type { ValidatorsStrategy } from "src/shared/core/adapters/validators/domain/interfaces/strategies/validators-strategy.interface";

export interface ValidatorsGenerator extends ValidatorsStrategy {
    changeStrategy(strategy: ValidatorsStrategy): void;
}
