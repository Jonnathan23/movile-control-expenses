import { Capacitor } from "@capacitor/core";

import type { UUIDHelper } from "src/shared/core/helpers/generators.helper";

import type { BudgetDataSource } from "src/features/transactions/core/domain/datasources/budget.datasource";
import type { CategoryDatasource } from "src/features/transactions/core/domain/datasources/category.datasource";
import type { TransactionDataSource } from "src/features/transactions/core/domain/datasources/transaction.datasource";
import type { TransactionsDataSourceFactory } from "src/features/transactions/core/domain/factories/data-source.factory";
import type { DefaultCategoriesFactory } from "src/features/transactions/core/domain/factories/default-categories.factory";

import { BudgetDataSourceLocalStorage } from "src/features/transactions/core/infrastructure/datasources/local-storage/budget.datasource";
import { CategoryDataSourceLocalStorage } from "src/features/transactions/core/infrastructure/datasources/local-storage/categories.datasource";
import { TransactionDataSourceLocalStorage } from "src/features/transactions/core/infrastructure/datasources/local-storage/transaction.datasource";
import { BudgetDataSourcePreferences } from "src/features/transactions/core/infrastructure/datasources/preferences/budget.datasource";
import { CategoryDataSourcePreferences } from "src/features/transactions/core/infrastructure/datasources/preferences/categories.datasource";
import { TransactionDataSourcePreferences } from "src/features/transactions/core/infrastructure/datasources/preferences/transaction.datasource";
import type { BudgetMapper } from "src/features/transactions/core/infrastructure/mappers/budget.mapper";
import type { CategoryMapper } from "src/features/transactions/core/infrastructure/mappers/category.mapper";
import type { TransactionMapper } from "src/features/transactions/core/infrastructure/mappers/transaction.mapper";

export class DataSourceFactoryImpl implements TransactionsDataSourceFactory {
    public constructor(
        private readonly transactionMapper: TransactionMapper,
        private readonly budgetMapper: BudgetMapper,
        private readonly categoryMapper: CategoryMapper,
        private readonly defaultCategoriesFactory: DefaultCategoriesFactory,
        private readonly uuidGen: UUIDHelper,
    ) {}

    public createTransactionDataSource(): TransactionDataSource {
        if (Capacitor.isNativePlatform()) {
            return new TransactionDataSourcePreferences(this.transactionMapper, this.uuidGen);
        }
        return new TransactionDataSourceLocalStorage(this.transactionMapper, this.uuidGen);
    }

    public createBudgetDataSource(): BudgetDataSource {
        if (Capacitor.isNativePlatform()) {
            return new BudgetDataSourcePreferences(this.budgetMapper);
        }
        return new BudgetDataSourceLocalStorage(this.budgetMapper);
    }

    public createCategoryDataSource(): CategoryDatasource {
        if (Capacitor.isNativePlatform()) {
            return new CategoryDataSourcePreferences(this.defaultCategoriesFactory, this.categoryMapper);
        }
        return new CategoryDataSourceLocalStorage(this.defaultCategoriesFactory, this.categoryMapper);
    }
}
