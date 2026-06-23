import { v4 as generateUniversallyUniqueIdentifier } from "uuid";

import type { UuidStrategy } from "src/shared/core/adapters/uuid/domain/interface/uuid-strategy.interface";
import type { Uuid } from "src/shared/core/types/uuid.type";

export class UuidLibraryStrategy implements UuidStrategy {
    public generateUuid(): Uuid {
        const sessionUniqueIdentifier = generateUniversallyUniqueIdentifier();

        return sessionUniqueIdentifier as Uuid;
    }
}
