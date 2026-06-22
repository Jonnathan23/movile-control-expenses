import type { CurrencyFormatStrategy } from "src/shared/core/adapters/format/domain/interface/currency-format-strategy.interface";

export class IntlCurrencyFormatStrategy implements CurrencyFormatStrategy {
    public formatCurrency(amount: number): string {
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
    }
}
