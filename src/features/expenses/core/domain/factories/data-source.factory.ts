import type { BudgetDataSource } from "src/features/expenses/core/domain/datasources/budget.datasource";
import type { CategoryDatasource } from "src/features/expenses/core/domain/datasources/category.datasource";
import type { ExpenseDataSource } from "src/features/expenses/core/domain/datasources/expense.datasource";

export interface ExpensesDataSourceFactory {
    createExpenseDataSource(): ExpenseDataSource;
    createBudgetDataSource(): BudgetDataSource;
    createCategoryDataSource(): CategoryDatasource;
}
