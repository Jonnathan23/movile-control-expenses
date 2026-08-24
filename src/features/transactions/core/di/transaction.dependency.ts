import { uuidHelper } from "src/shared/core/helpers/generators.helper";

import { DefaultCategoriesGeneratorImpl } from "src/features/transactions/core/domain/generators/default-categories.generator";

import { DataSourceFactoryImpl } from "src/features/transactions/core/infrastructure/factories/create-all-datasource.factory";
import { BudgetMapperImpl } from "src/features/transactions/core/infrastructure/mappers/budget.mapper";
import { CategoryMapperImpl } from "src/features/transactions/core/infrastructure/mappers/category.mapper";
import { TransactionMapperImpl } from "src/features/transactions/core/infrastructure/mappers/transaction.mapper";
import { BudgetRepositoryImpl } from "src/features/transactions/core/infrastructure/repositories/budget.repository";
import { CategoriesRepositoryImpl } from "src/features/transactions/core/infrastructure/repositories/categories.repository";
import { TransactionRepositoryImpl } from "src/features/transactions/core/infrastructure/repositories/transaction.repository";

import { BudgetDtoFactoryImpl } from "src/features/transactions/core/application/factories/budget-dto.factory";
import { TransactionDtoFactoryImpl } from "src/features/transactions/core/application/factories/transaction-dto.factory";
import { GetBudgetUseCase } from "src/features/transactions/core/application/use-cases/budget/get-budget.use-case";
import { ResetAppUseCase } from "src/features/transactions/core/application/use-cases/budget/reset-app.use-case";
import { SaveBudgetUseCase } from "src/features/transactions/core/application/use-cases/budget/save-budget.use-case";
import { GetCategoriesUseCase } from "src/features/transactions/core/application/use-cases/categories/get-categories.use-case";
import { CreateTransactionUseCase } from "src/features/transactions/core/application/use-cases/transactions/create-transaction.use-case";
import { DeleteTransactionUseCase } from "src/features/transactions/core/application/use-cases/transactions/delete-transaction.use-case";
import { GetTransactionsUseCase } from "src/features/transactions/core/application/use-cases/transactions/get-transactions.use-case";
import { UpdateTransactionUseCase } from "src/features/transactions/core/application/use-cases/transactions/update-transaction.use-case";
import { validatorTransactionFeatureContainer } from "src/features/transactions/core/application/validators/di-feat-transaction.validator";

//* Factories
export const defaultCategoriesFactory = new DefaultCategoriesGeneratorImpl(uuidHelper);

//* 1. Mappers
const transactionMapper = new TransactionMapperImpl();
const budgetMapper = new BudgetMapperImpl();
const categoryMapper = new CategoryMapperImpl();

//* 2. DataSources
const dataSourceFactory = new DataSourceFactoryImpl(
    transactionMapper,
    budgetMapper,
    categoryMapper,
    defaultCategoriesFactory,
    uuidHelper,
);

const transactionDataSource = dataSourceFactory.createTransactionDataSource();
const budgetDataSource = dataSourceFactory.createBudgetDataSource();
const categoriesDataSource = dataSourceFactory.createCategoryDataSource();

//* 3. Repositories
const transactionRepository = new TransactionRepositoryImpl(transactionDataSource);
const budgetRepository = new BudgetRepositoryImpl(budgetDataSource);
const categoriesRepository = new CategoriesRepositoryImpl(categoriesDataSource);

//* 4. Validators

const { budgetValidatorContainer, transactionValidatorContainer } = validatorTransactionFeatureContainer;
const { createTransactionValidator, updateTransactionValidator } = transactionValidatorContainer;
const { createBudgetValidator } = budgetValidatorContainer;

//* 5. Factories
const transactionDtoFactory = new TransactionDtoFactoryImpl(createTransactionValidator, updateTransactionValidator);
const budgetDtoFactory = new BudgetDtoFactoryImpl(createBudgetValidator);

//* 6. Use Cases
// Transaction Use Cases
const getTransactionsUseCase = new GetTransactionsUseCase(transactionRepository);
const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository, transactionDtoFactory);
const updateTransactionUseCase = new UpdateTransactionUseCase(transactionRepository, transactionDtoFactory);
const deleteTransactionUseCase = new DeleteTransactionUseCase(transactionRepository);

// Budget Use Cases
const getBudgetUseCase = new GetBudgetUseCase(budgetRepository);
const saveBudgetUseCase = new SaveBudgetUseCase(budgetRepository, budgetDtoFactory);
const resetAppUseCase = new ResetAppUseCase(budgetRepository);

// Categories Use Cases
const getCategoriesUseCase = new GetCategoriesUseCase(categoriesRepository);

//* 7. Use Cases Actions
// Transactions actions
export const ExecuteGetTransactionsUseCase = getTransactionsUseCase.execute.bind(getTransactionsUseCase);
export const ExecuteCreateTransactionUseCase = createTransactionUseCase.execute.bind(createTransactionUseCase);
export const ExecuteUpdateTransactionUseCase = updateTransactionUseCase.execute.bind(updateTransactionUseCase);
export const ExecuteDeleteTransactionUseCase = deleteTransactionUseCase.execute.bind(deleteTransactionUseCase);

// Budget actions
export const ExecuteGetBudgetUseCase = getBudgetUseCase.execute.bind(getBudgetUseCase);
export const ExecuteSaveBudgetUseCase = saveBudgetUseCase.execute.bind(saveBudgetUseCase);
export const ExecuteResetAppUseCase = resetAppUseCase.execute.bind(resetAppUseCase);

// Categories actions
export const ExecuteGetCategoriesUseCase = getCategoriesUseCase.execute.bind(getCategoriesUseCase);
