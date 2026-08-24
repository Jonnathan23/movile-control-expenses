import type { CurrencyFormatGenerator } from "src/shared/core/adapters/format/domain/interface/currency/currency-format-generator.interface";
import type { DateFormatGenerator } from "src/shared/core/adapters/format/domain/interface/date/date-format-generator.interface";
import type { TimeFormatGenerator } from "src/shared/core/adapters/format/domain/interface/time/time-format-generator.interface";

import { CurrencyFormatGeneratorSingleton } from "src/shared/core/adapters/format/infrastructure/generator/currency-format.generator";
import { DateFormatGeneratorSingleton } from "src/shared/core/adapters/format/infrastructure/generator/date-format.generator";
import { TimeFormatGeneratorSingleton } from "src/shared/core/adapters/format/infrastructure/generator/time-format.generator";

export const adapterCurrencyFormatter: CurrencyFormatGenerator = CurrencyFormatGeneratorSingleton.getInstance();
export const adapterDateFormatter: DateFormatGenerator = DateFormatGeneratorSingleton.getInstance();
export const adapterTimeFormatter: TimeFormatGenerator = TimeFormatGeneratorSingleton.getInstance();
