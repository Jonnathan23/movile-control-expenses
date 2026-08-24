export interface TimeFormatStrategy {
    formatTime(date: Date | string): string;
}
