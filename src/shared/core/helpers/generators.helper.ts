import { adapterUuidGenerator } from "src/shared/core/adapters/uuid/di/uuid.dependencies";
import type { Uuid } from "src/shared/core/types/uuid.type";

export type UUIDHelper = () => Uuid;

export const uuidHelper: UUIDHelper = () => {
    return adapterUuidGenerator.generateUuid();
};
