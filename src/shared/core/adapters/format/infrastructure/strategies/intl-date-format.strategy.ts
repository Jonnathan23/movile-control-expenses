import type { DateFormatStrategy } from "src/shared/core/adapters/format/domain/interface/date-format-strategy.interface";

export class IntlDateFormatStrategy implements DateFormatStrategy {
    public formatDate(date: Date | string): string {
        const dateObj = new Date(date);
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };

        return new Intl.DateTimeFormat("es-ES", options).format(dateObj);
    }
}
