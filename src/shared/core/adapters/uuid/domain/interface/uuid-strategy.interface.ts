import type { Uuid } from "src/shared/core/types/uuid.type";

export interface UuidStrategy {
    generateUuid(): Uuid;
}
