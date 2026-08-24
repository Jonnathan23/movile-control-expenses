import { TimeFormatContext } from "src/shared/core/adapters/format/domain/context/time-format.context";
import type { TimeFormatGenerator } from "src/shared/core/adapters/format/domain/interface/time/time-format-generator.interface";
import type { TimeFormatStrategy } from "src/shared/core/adapters/format/domain/interface/time/time-format-strategy.interface";

import { IntlTimeFormatStrategy } from "src/shared/core/adapters/format/infrastructure/strategies/intl-time-format.strategy";

export class TimeFormatGeneratorSingleton implements TimeFormatGenerator {
    private static instance: TimeFormatGeneratorSingleton;
    private readonly formatContext: TimeFormatContext;

    private constructor(strategy: TimeFormatStrategy) {
        this.formatContext = new TimeFormatContext(strategy);
    }

    public static getInstance(): TimeFormatGeneratorSingleton {
        if (!TimeFormatGeneratorSingleton.instance) {
            const defaultStrategy = new IntlTimeFormatStrategy();
            TimeFormatGeneratorSingleton.instance = new TimeFormatGeneratorSingleton(defaultStrategy);
        }
        return TimeFormatGeneratorSingleton.instance;
    }

    public formatTime(date: Date | string): string {
        return this.formatContext.formatTime(date);
    }

    public changeStrategy(strategy: TimeFormatStrategy): void {
        this.formatContext.setStrategy(strategy);
    }
}
