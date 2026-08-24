import type { AccountDatasource } from "src/features/accounts/core/domain/datasources/account.datasource";
import type { AccountEntity } from "src/features/accounts/core/domain/entities/account.entity";
import type { AccountsRepository } from "src/features/accounts/core/domain/repositories/accounts.repository";

export class AccountsRepositoryImpl implements AccountsRepository {
    public constructor(private readonly datasource: AccountDatasource) {}

    public async getAccounts(): Promise<AccountEntity[]> {
        return await this.datasource.getAccounts();
    }
}
