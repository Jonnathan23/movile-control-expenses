import type { DateFormatStrategy } from "src/shared/core/adapters/format/domain/interface/date/date-format-strategy.interface";

export interface DateFormatGenerator extends DateFormatStrategy {
    changeStrategy(strategy: DateFormatStrategy): void;
}
