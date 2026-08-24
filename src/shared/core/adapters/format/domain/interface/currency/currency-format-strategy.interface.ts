export interface CurrencyFormatStrategy {
    formatCurrency(amount: number): string;
}
