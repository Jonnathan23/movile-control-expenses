import type { UuidGenerator } from "src/shared/core/adapters/uuid/domain/interface/uuid-generator.interface";

import { UuidGeneratorSingleton } from "src/shared/core/adapters/uuid/infrastructure/generator/uuid.generator";

export const adapterUuidGenerator: UuidGenerator = UuidGeneratorSingleton.getInstance();
