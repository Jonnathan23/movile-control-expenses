import { DateFormatContext } from "src/shared/core/adapters/format/domain/context/date-format.context";
import type { DateFormatGenerator } from "src/shared/core/adapters/format/domain/interface/date/date-format-generator.interface";
import type { DateFormatStrategy } from "src/shared/core/adapters/format/domain/interface/date/date-format-strategy.interface";

import { IntlDateFormatStrategy } from "src/shared/core/adapters/format/infrastructure/strategies/intl-date-format.strategy";

export class DateFormatGeneratorSingleton implements DateFormatGenerator {
    private static instance: DateFormatGeneratorSingleton;
    private readonly formatContext: DateFormatContext;

    private constructor(strategy: DateFormatStrategy) {
        this.formatContext = new DateFormatContext(strategy);
    }

    public static getInstance(): DateFormatGeneratorSingleton {
        if (!DateFormatGeneratorSingleton.instance) {
            const defaultStrategy = new IntlDateFormatStrategy();
            DateFormatGeneratorSingleton.instance = new DateFormatGeneratorSingleton(defaultStrategy);
        }
        return DateFormatGeneratorSingleton.instance;
    }

    public formatDate(date: Date | string): string {
        return this.formatContext.formatDate(date);
    }

    public changeStrategy(strategy: DateFormatStrategy): void {
        this.formatContext.setStrategy(strategy);
    }
}
