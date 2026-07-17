import { adapterUuidGenerator } from "src/shared/core/adapters/uuid/di/uuid.dependencies";
import type { Uuid } from "src/shared/core/types/uuid.type";

export const uuidHelper = (): Uuid => {
    return adapterUuidGenerator.generateUuid();
};
