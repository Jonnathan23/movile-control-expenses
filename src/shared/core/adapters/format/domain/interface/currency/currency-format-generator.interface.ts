import type { CurrencyFormatStrategy } from "src/shared/core/adapters/format/domain/interface/currency/currency-format-strategy.interface";

export interface CurrencyFormatGenerator extends CurrencyFormatStrategy {
    changeStrategy(strategy: CurrencyFormatStrategy): void;
}
