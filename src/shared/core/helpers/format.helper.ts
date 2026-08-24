import {
    adapterCurrencyFormatter,
    adapterDateFormatter,
    adapterTimeFormatter,
} from "src/shared/core/adapters/format/di/format.dependencies";

export const currencyFormatHelper = (amount: number): string => {
    return adapterCurrencyFormatter.formatCurrency(amount);
};

export const dateFormatHelper = (date: Date | string): string => {
    return adapterDateFormatter.formatDate(date);
};

export const timeFormatHelper = (date: Date | string): string => {
    return adapterTimeFormatter.formatTime(date);
};
