import { v4 as generateUniversallyUniqueIdentifier } from "uuid";

import type { UuidStrategy } from "src/shared/adapters/uuid/domain/interface/uuid-strategy.interface";
import type { Uuid } from "src/shared/types/uuid.type";

export class UuidLibraryStrategy implements UuidStrategy {
    generateUuid(): Uuid {
        const sessionUniqueIdentifier = generateUniversallyUniqueIdentifier();

        return sessionUniqueIdentifier as Uuid;
    }
}
