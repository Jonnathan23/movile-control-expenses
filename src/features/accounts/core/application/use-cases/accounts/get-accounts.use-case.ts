import type { AccountEntity } from "src/features/accounts/core/domain/entities/account.entity";
import type { AccountsRepository } from "src/features/accounts/core/domain/repositories/accounts.repository";

export class GetAccountsUseCase {
    public constructor(private readonly repository: AccountsRepository) {}

    public async execute(): Promise<AccountEntity[]> {
        return await this.repository.getAccounts();
    }
}
