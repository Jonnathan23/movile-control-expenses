import type { AccountEntity } from "src/features/accounts/core/entities/account.entity";

export interface TotalNetStrategy {
    calculateTotalNet(accounts: AccountEntity[]): number;
}
