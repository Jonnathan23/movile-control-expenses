import type { DateFormatStrategy } from "src/shared/core/adapters/format/domain/interface/date-format-strategy.interface";

export class DateFormatContext implements DateFormatStrategy {
    private strategy: DateFormatStrategy;

    constructor(strategy: DateFormatStrategy) {
        this.setStrategy(strategy);
    }

    public setStrategy(strategy: DateFormatStrategy): void {
        this.strategy = strategy;
    }

    public formatDate(date: Date | string): string {
        return this.strategy.formatDate(date);
    }
}
