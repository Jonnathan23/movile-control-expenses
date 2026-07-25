import { TotalNetContext } from "src/shared/core/adapters/calculations/domain/context/total-net.context";
import type { TotalNetGenerator } from "src/shared/core/adapters/calculations/domain/interface/generators/total-net-generator.interface";
import type { TotalNetStrategy } from "src/shared/core/adapters/calculations/domain/interface/strategies/total-net-strategy.interface";

import { DefaultTotalNetStrategy } from "src/shared/core/adapters/calculations/infrastructure/strategies/default-total-net.strategy";

import type { AccountEntity } from "src/features/accounts/core/entities/account.entity";

export class TotalNetGeneratorSingleton implements TotalNetGenerator {
    private static instance: TotalNetGeneratorSingleton;
    private readonly featureContext: TotalNetContext;

    private constructor(strategy: TotalNetStrategy) {
        this.featureContext = new TotalNetContext(strategy);
    }

    public static getInstance(): TotalNetGeneratorSingleton {
        if (!TotalNetGeneratorSingleton.instance) {
            const defaultStrategy = new DefaultTotalNetStrategy();
            TotalNetGeneratorSingleton.instance = new TotalNetGeneratorSingleton(defaultStrategy);
        }
        return TotalNetGeneratorSingleton.instance;
    }

    public calculateTotalNet(accounts: AccountEntity[]): number {
        return this.featureContext.calculateTotalNet(accounts);
    }

    public changeStrategy(strategy: TotalNetStrategy): void {
        this.featureContext.setStrategy(strategy);
    }
}
