import { UuidGeneratorContext } from "src/shared/core/adapters/uuid/domain/context/uuid-generator.context";
import type { UuidStrategy } from "src/shared/core/adapters/uuid/domain/interface/uuid-strategy.interface";

import { UuidLibraryStrategy } from "src/shared/core/adapters/uuid/infrastructure/strategies/uuid-library.strategy";

const generatorUuidStrategy = new UuidLibraryStrategy();
const uuidGenerator = new UuidGeneratorContext(generatorUuidStrategy);

export const adapterUuidGenerator: UuidStrategy = uuidGenerator;
