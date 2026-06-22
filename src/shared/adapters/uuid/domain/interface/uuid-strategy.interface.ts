import type { Uuid } from "src/shared/types/uuid.type";

export interface UuidStrategy {
    generateUuid(): Uuid;
}
