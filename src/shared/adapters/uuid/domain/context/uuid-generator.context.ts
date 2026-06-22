import type { UuidStrategy } from "src/shared/adapters/uuid/domain/interface/uuid-strategy.interface";
import type { Uuid } from "src/shared/types/uuid.type";

export class UUIDGeneratorContext {
    private uuidStrategy!: UuidStrategy;

    constructor(uuidStrategy: UuidStrategy) {
        this.setUuidStrategy(uuidStrategy);
    }

    setUuidStrategy(uuidStrategy: UuidStrategy): void {
        this.uuidStrategy = uuidStrategy;
    }

    generateUuid(): Uuid {
        return this.uuidStrategy.generateUuid();
    }
}
