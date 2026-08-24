import type { BudgetDataSource } from "src/features/transactions/core/domain/datasources/budget.datasource";
import type { CategoryDatasource } from "src/features/transactions/core/domain/datasources/category.datasource";
import type { TransactionDataSource } from "src/features/transactions/core/domain/datasources/transaction.datasource";

export interface TransactionsDataSourceFactory {
    createTransactionDataSource(): TransactionDataSource;
    createBudgetDataSource(): BudgetDataSource;
    createCategoryDataSource(): CategoryDatasource;
}
