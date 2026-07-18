import { Capacitor } from "@capacitor/core";

import type { UUIDHelper } from "src/shared/core/helpers/generators.helper";

import type { BudgetDataSource } from "src/features/expenses/core/domain/datasources/budget.datasource";
import type { CategoryDatasource } from "src/features/expenses/core/domain/datasources/category.datasource";
import type { ExpenseDataSource } from "src/features/expenses/core/domain/datasources/expense.datasource";
import type { ExpensesDataSourceFactory } from "src/features/expenses/core/domain/factories/data-source.factory";
import type { DefaultCategoriesFactory } from "src/features/expenses/core/domain/factories/default-categories.factory";

import { BudgetDataSourceLocalStorage } from "src/features/expenses/core/infrastructure/datasources/local-storage/budget.datasource";
import { CategoryDataSourceLocalStorage } from "src/features/expenses/core/infrastructure/datasources/local-storage/categories.datasource";
import { ExpenseDataSourceLocalStorage } from "src/features/expenses/core/infrastructure/datasources/local-storage/expense.datasource";
import { BudgetDataSourcePreferences } from "src/features/expenses/core/infrastructure/datasources/preferences/budget.datasource";
import { CategoryDataSourcePreferences } from "src/features/expenses/core/infrastructure/datasources/preferences/categories.datasource";
import { ExpenseDataSourcePreferences } from "src/features/expenses/core/infrastructure/datasources/preferences/expense.datasource";
import type { BudgetMapper } from "src/features/expenses/core/infrastructure/mappers/budget.mapper";
import type { CategoryMapper } from "src/features/expenses/core/infrastructure/mappers/category.mapper";
import type { ExpenseMapper } from "src/features/expenses/core/infrastructure/mappers/expense.mapper";

export class DataSourceFactoryImpl implements ExpensesDataSourceFactory {
    public constructor(
        private readonly expenseMapper: ExpenseMapper,
        private readonly budgetMapper: BudgetMapper,
        private readonly categoryMapper: CategoryMapper,
        private readonly defaultCategoriesFactory: DefaultCategoriesFactory,
        private readonly uuidGen: UUIDHelper,
    ) {}

    public createExpenseDataSource(): ExpenseDataSource {
        if (Capacitor.isNativePlatform()) {
            return new ExpenseDataSourcePreferences(this.expenseMapper, this.uuidGen);
        }
        return new ExpenseDataSourceLocalStorage(this.expenseMapper, this.uuidGen);
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
