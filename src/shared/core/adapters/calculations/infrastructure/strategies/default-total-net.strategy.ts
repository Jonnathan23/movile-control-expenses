import type { TotalNetStrategy } from "src/shared/core/adapters/calculations/domain/interface/strategies/total-net-strategy.interface";

import type { AccountEntity } from "src/features/accounts/core/domain/entities/account.entity";

export class DefaultTotalNetStrategy implements TotalNetStrategy {
    public calculateTotalNet(accounts: AccountEntity[]): number {
        return accounts.reduce((accumulatedBalance, account) => accumulatedBalance + account.balance, 0);
    }
}
