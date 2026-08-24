import { Preferences } from "@capacitor/preferences";

import type { AccountDatasource } from "src/features/accounts/core/domain/datasources/account.datasource";
import type { AccountEntity } from "src/features/accounts/core/domain/entities/account.entity";
import type { DefaultAccountsGenerator } from "src/features/accounts/core/domain/generators/default-accounts.generator";

import type { AccountMapper } from "src/features/accounts/core/infrastructure/mappers/account.mapper";

export class AccountDataSourcePreferences implements AccountDatasource {
    private readonly storageKey = "accounts";

    public constructor(
        private readonly defaultAccountsGenerator: DefaultAccountsGenerator,
        private readonly accountMapper: AccountMapper,
    ) {}

    public async getAccounts(): Promise<AccountEntity[]> {
        const { value } = await Preferences.get({ key: this.storageKey });
        if (value) {
            const rawData = JSON.parse(value) as unknown[];
            return this.accountMapper.toArrayEntities(rawData);
        }

        const defaultAccounts = this.defaultAccountsGenerator.create();
        await Preferences.set({
            key: this.storageKey,
            value: JSON.stringify(defaultAccounts),
        });

        return defaultAccounts;
    }
}
