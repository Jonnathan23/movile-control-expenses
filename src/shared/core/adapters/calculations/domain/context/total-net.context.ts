import type { TotalNetStrategy } from "src/shared/core/adapters/calculations/domain/interface/strategies/total-net-strategy.interface";

import type { AccountEntity } from "src/features/accounts/core/entities/account.entity";

export class TotalNetContext implements TotalNetStrategy {
    private strategy!: TotalNetStrategy;

    public constructor(strategy: TotalNetStrategy) {
        this.setStrategy(strategy);
    }

    public setStrategy(strategy: TotalNetStrategy): void {
        this.strategy = strategy;
    }

    public calculateTotalNet(accounts: AccountEntity[]): number {
        return this.strategy.calculateTotalNet(accounts);
    }
}
