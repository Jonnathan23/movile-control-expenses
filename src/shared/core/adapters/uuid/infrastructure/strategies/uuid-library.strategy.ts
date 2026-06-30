import { v4 as generateUniversallyUniqueIdentifier } from "uuid";

import type { Uuid } from "src/shared/core/types/uuid.type";

import type { UuidStrategy } from "src/shared/core/adapters/uuid/domain/interface/uuid-strategy.interface";

export class UuidLibraryStrategy implements UuidStrategy {
    public generateUuid(): Uuid {
        const sessionUniqueIdentifier = generateUniversallyUniqueIdentifier();

        return sessionUniqueIdentifier as Uuid;
    }
}
