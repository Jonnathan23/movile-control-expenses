import type { UUIDHelper } from "src/shared/core/helpers/generators.helper";

import { AccountEntity } from "src/features/accounts/core/domain/entities/account.entity";

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
            new AccountEntity({ id: this.uuidGenerator(), name: "Efectivo", balance: this.defaultBalanceCash, icon: "💵" }),
            new AccountEntity({ id: this.uuidGenerator(), name: "Cuenta Banco", balance: this.defaultBalanceBank, icon: "🏦" }),
            new AccountEntity({
                id: this.uuidGenerator(),
                name: "Tarjeta de Crédito",
                balance: this.defaultBalanceCredit,
                icon: "💳",
            }),
            new AccountEntity({ id: this.uuidGenerator(), name: "Ahorros", balance: this.defaultBalanceSavings, icon: "🐷" }),
        ];
    }
}
