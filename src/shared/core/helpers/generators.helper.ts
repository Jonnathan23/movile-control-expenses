import { adapterUuidGenerator } from "src/shared/core/adapters/uuid/di/uuid.dependencies";
import type { UuidStrategy } from "src/shared/core/adapters/uuid/domain/interface/uuid-strategy.interface";

export const globalUuidGenerator: UuidStrategy = adapterUuidGenerator;
