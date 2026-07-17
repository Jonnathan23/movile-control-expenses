import type { UuidStrategy } from "src/shared/core/adapters/uuid/domain/interface/uuid-strategy.interface";

export interface UuidGenerator extends UuidStrategy {
    changeStrategy(strategy: UuidStrategy): void;
}
