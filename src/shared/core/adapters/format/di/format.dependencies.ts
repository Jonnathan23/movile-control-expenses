import { CurrencyFormatContext } from "src/shared/core/adapters/format/domain/context/currency-format.context";
import { DateFormatContext } from "src/shared/core/adapters/format/domain/context/date-format.context";
import type { CurrencyFormatStrategy } from "src/shared/core/adapters/format/domain/interface/currency-format-strategy.interface";
import type { DateFormatStrategy } from "src/shared/core/adapters/format/domain/interface/date-format-strategy.interface";
import { IntlCurrencyFormatStrategy } from "src/shared/core/adapters/format/infrastructure/strategies/intl-currency-format.strategy";
import { IntlDateFormatStrategy } from "src/shared/core/adapters/format/infrastructure/strategies/intl-date-format.strategy";

const intlCurrencyFormatStrategy = new IntlCurrencyFormatStrategy();
const currencyFormatContext = new CurrencyFormatContext(intlCurrencyFormatStrategy);

const intlDateFormatStrategy = new IntlDateFormatStrategy();
const dateFormatContext = new DateFormatContext(intlDateFormatStrategy);

export const adapterCurrencyFormatter: CurrencyFormatStrategy = currencyFormatContext;
export const adapterDateFormatter: DateFormatStrategy = dateFormatContext;
