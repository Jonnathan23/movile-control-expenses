import type { TimeFormatStrategy } from "src/shared/core/adapters/format/domain/interface/time/time-format-strategy.interface";

export class TimeFormatContext implements TimeFormatStrategy {
    private strategy!: TimeFormatStrategy;

    public constructor(strategy: TimeFormatStrategy) {
        this.setStrategy(strategy);
    }

    public setStrategy(strategy: TimeFormatStrategy): void {
        this.strategy = strategy;
    }

    public formatTime(date: Date | string): string {
        return this.strategy.formatTime(date);
    }
}
