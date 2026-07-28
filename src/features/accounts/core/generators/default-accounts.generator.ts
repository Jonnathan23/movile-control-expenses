import type { UUIDHelper } from "src/shared/core/helpers/generators.helper";

import { AccountEntity } from "src/features/accounts/core/entities/account.entity";

export interface DefaultAccountsGenerator {
    create(): AccountEntity[];
}

export class DefaultAccountsGeneratorImpl implements DefaultAccountsGenerator {
    private readonly defaultBalanceCash = 850.0;
    private readonly defaultBalanceBank = 3240.5;
    private readonly defaultBalanceCredit = -720.0;
    private readonly defaultBalanceSavings = 5500.0;

    public constructor(private readonly uuidGenerator: UUIDHelper) {}

    public create(): AccountEntity[] {
        return [
            new AccountEntity(this.uuidGenerator(), "Efectivo", this.defaultBalanceCash, "💵"),
            new AccountEntity(this.uuidGenerator(), "Cuenta Banco", this.defaultBalanceBank, "🏦"),
            new AccountEntity(this.uuidGenerator(), "Tarjeta de Crédito", this.defaultBalanceCredit, "💳"),
            new AccountEntity(this.uuidGenerator(), "Ahorros", this.defaultBalanceSavings, "🐷"),
        ];
    }
}
