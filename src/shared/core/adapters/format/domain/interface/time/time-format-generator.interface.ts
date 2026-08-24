import type { TimeFormatStrategy } from "src/shared/core/adapters/format/domain/interface/time/time-format-strategy.interface";

export interface TimeFormatGenerator extends TimeFormatStrategy {
    changeStrategy(strategy: TimeFormatStrategy): void;
}
