import type { Uuid } from "src/shared/core/types/uuid.type";

import type { UuidStrategy } from "src/shared/core/adapters/uuid/domain/interface/uuid-strategy.interface";

export class UuidGeneratorContext {
    private strategy: UuidStrategy;

    public constructor(strategy: UuidStrategy) {
        this.strategy = strategy;
    }

    public setUuidStrategy(strategy: UuidStrategy): void {
        this.strategy = strategy;
    }

    public generateUuid(): Uuid {
        return this.strategy.generateUuid();
    }
}
