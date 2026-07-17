import type { Uuid } from "src/shared/core/types/uuid.type";

import { UuidGeneratorContext } from "src/shared/core/adapters/uuid/domain/context/uuid-generator.context";
import type { UuidGenerator } from "src/shared/core/adapters/uuid/domain/interface/uuid-generator.interface";
import type { UuidStrategy } from "src/shared/core/adapters/uuid/domain/interface/uuid-strategy.interface";

import { UuidLibraryStrategy } from "src/shared/core/adapters/uuid/infrastructure/strategies/uuid-library.strategy";

export class UuidGeneratorSingleton implements UuidGenerator {
    private static instance: UuidGeneratorSingleton;
    private readonly generatorContext: UuidGeneratorContext;

    private constructor(strategy: UuidStrategy) {
        this.generatorContext = new UuidGeneratorContext(strategy);
    }

    public static getInstance(): UuidGeneratorSingleton {
        if (!UuidGeneratorSingleton.instance) {
            const defaultStrategy = new UuidLibraryStrategy();
            UuidGeneratorSingleton.instance = new UuidGeneratorSingleton(defaultStrategy);
        }
        return UuidGeneratorSingleton.instance;
    }

    public generateUuid(): Uuid {
        return this.generatorContext.generateUuid();
    }

    public changeStrategy(strategy: UuidStrategy): void {
        this.generatorContext.setUuidStrategy(strategy);
    }
}
