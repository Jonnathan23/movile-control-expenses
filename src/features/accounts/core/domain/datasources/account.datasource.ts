import type { AccountEntity } from "src/features/accounts/core/domain/entities/account.entity";

export interface AccountDatasource {
    getAccounts(): Promise<AccountEntity[]>;
}
