import { CurrencyFormatContext } from "src/shared/core/adapters/format/domain/context/currency-format.context";
import type { CurrencyFormatGenerator } from "src/shared/core/adapters/format/domain/interface/currency-format-generator.interface";
import type { CurrencyFormatStrategy } from "src/shared/core/adapters/format/domain/interface/currency-format-strategy.interface";

import { IntlCurrencyFormatStrategy } from "src/shared/core/adapters/format/infrastructure/strategies/intl-currency-format.strategy";

export class CurrencyFormatGeneratorSingleton implements CurrencyFormatGenerator {
    private static instance: CurrencyFormatGeneratorSingleton;
    private readonly formatContext: CurrencyFormatContext;

    private constructor(strategy: CurrencyFormatStrategy) {
        this.formatContext = new CurrencyFormatContext(strategy);
    }

    public static getInstance(): CurrencyFormatGeneratorSingleton {
        if (!CurrencyFormatGeneratorSingleton.instance) {
            const defaultStrategy = new IntlCurrencyFormatStrategy();
            CurrencyFormatGeneratorSingleton.instance = new CurrencyFormatGeneratorSingleton(defaultStrategy);
        }
        return CurrencyFormatGeneratorSingleton.instance;
    }

    public formatCurrency(amount: number): string {
        return this.formatContext.formatCurrency(amount);
    }

    public changeStrategy(strategy: CurrencyFormatStrategy): void {
        this.formatContext.setStrategy(strategy);
    }
}
