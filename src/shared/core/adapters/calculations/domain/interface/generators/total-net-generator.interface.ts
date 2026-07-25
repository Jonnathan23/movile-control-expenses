import type { TotalNetStrategy } from "src/shared/core/adapters/calculations/domain/interface/strategies/total-net-strategy.interface";

export interface TotalNetGenerator extends TotalNetStrategy {
    changeStrategy(strategy: TotalNetStrategy): void;
}
