import { uuidHelper } from "src/shared/core/helpers/generators.helper";

import { DefaultAccountsGeneratorImpl } from "src/features/accounts/core/domain/generators/default-accounts.generator";

import { AccountDataSourcePreferences } from "src/features/accounts/core/infrastructure/datasources/preferences/accounts.datasource";
import { AccountMapper } from "src/features/accounts/core/infrastructure/mappers/account.mapper";
import { AccountsRepositoryImpl } from "src/features/accounts/core/infrastructure/repositories/accounts.repository";

import { GetAccountsUseCase } from "src/features/accounts/core/application/use-cases/accounts/get-accounts.use-case";

//* Generators / Mappers
export const defaultAccountsFactory = new DefaultAccountsGeneratorImpl(uuidHelper);
export const accountMapper = new AccountMapper();

//* DataSources
export const accountDataSource = new AccountDataSourcePreferences(defaultAccountsFactory, accountMapper);

//* Repositories
export const accountsRepository = new AccountsRepositoryImpl(accountDataSource);

//* Use Cases
const getAccountsUseCase = new GetAccountsUseCase(accountsRepository);

//* Use Cases Actions
export const ExecuteGetAccountsUseCase = getAccountsUseCase.execute.bind(getAccountsUseCase);
