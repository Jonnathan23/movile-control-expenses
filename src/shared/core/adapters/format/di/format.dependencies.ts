import type { CurrencyFormatGenerator } from "src/shared/core/adapters/format/domain/interface/currency-format-generator.interface";
import type { DateFormatGenerator } from "src/shared/core/adapters/format/domain/interface/date-format-generator.interface";

import { CurrencyFormatGeneratorSingleton } from "src/shared/core/adapters/format/infrastructure/generator/currency-format.generator";
import { DateFormatGeneratorSingleton } from "src/shared/core/adapters/format/infrastructure/generator/date-format.generator";

export const adapterCurrencyFormatter: CurrencyFormatGenerator = CurrencyFormatGeneratorSingleton.getInstance();
export const adapterDateFormatter: DateFormatGenerator = DateFormatGeneratorSingleton.getInstance();
