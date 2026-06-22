import { UUIDGeneratorContext } from "src/shared/adapters/uuid/domain/context/uuid-generator.context";
import type { UuidStrategy } from "src/shared/adapters/uuid/domain/interface/uuid-strategy.interface";
import { UuidLibraryStrategy } from "src/shared/adapters/uuid/infrastructure/strategies/uuid-library.strategy";

const generatorUuidStrategy = new UuidLibraryStrategy();
const uuidGenerator = new UUIDGeneratorContext(generatorUuidStrategy);

export const globalUuidGenerator: UuidStrategy = uuidGenerator;
