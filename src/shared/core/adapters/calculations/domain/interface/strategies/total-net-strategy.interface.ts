import type { AccountEntity } from "src/features/accounts/core/domain/entities/account.entity";

export interface TotalNetStrategy {
    calculateTotalNet(accounts: AccountEntity[]): number;
}
