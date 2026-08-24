import type { AccountEntity } from "src/features/accounts/core/domain/entities/account.entity";

export interface AccountsRepository {
    getAccounts(): Promise<AccountEntity[]>;
}
