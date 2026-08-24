import type { TimeFormatStrategy } from "src/shared/core/adapters/format/domain/interface/time/time-format-strategy.interface";

export class IntlTimeFormatStrategy implements TimeFormatStrategy {
    public formatTime(date: Date | string): string {
        const dateObj = new Date(date);
        const options: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit",
        };

        return new Intl.DateTimeFormat("es-MX", options).format(dateObj);
    }
}
