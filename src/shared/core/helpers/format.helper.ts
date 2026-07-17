import { adapterCurrencyFormatter, adapterDateFormatter } from "src/shared/core/adapters/format/di/format.dependencies";

export const currencyFormatHelper = (amount: number): string => {
    return adapterCurrencyFormatter.formatCurrency(amount);
};

export const dateFormatHelper = (date: Date | string): string => {
    return adapterDateFormatter.formatDate(date);
};
