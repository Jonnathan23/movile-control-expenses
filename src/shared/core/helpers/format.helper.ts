import { adapterCurrencyFormatter, adapterDateFormatter } from "src/shared/core/adapters/format/di/format.dependencies";

import type { CurrencyFormatStrategy } from "src/shared/core/adapters/format/domain/interface/currency-format-strategy.interface";
import type { DateFormatStrategy } from "src/shared/core/adapters/format/domain/interface/date-format-strategy.interface";

export const globalCurrencyFormatter: CurrencyFormatStrategy = adapterCurrencyFormatter;
export const globalDateFormatter: DateFormatStrategy = adapterDateFormatter;
