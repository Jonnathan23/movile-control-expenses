import type { CurrencyFormatStrategy } from "src/shared/core/adapters/format/domain/interface/currency-format-strategy.interface";

export class CurrencyFormatContext implements CurrencyFormatStrategy {
    private strategy: CurrencyFormatStrategy;

    constructor(strategy: CurrencyFormatStrategy) {
        this.setStrategy(strategy);
    }

    public setStrategy(strategy: CurrencyFormatStrategy): void {
        this.strategy = strategy;
    }

    public formatCurrency(amount: number): string {
        return this.strategy.formatCurrency(amount);
    }
}
