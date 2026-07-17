import { adapterUuidGenerator } from "src/shared/core/adapters/uuid/di/uuid.dependencies";

import { DefaultCategoriesFactory } from "src/features/expenses/core/domain/factories/default-categories.factory";

import { BudgetDataSourceLocalStorage } from "src/features/expenses/core/infrastructure/datasources/local-storage/budget.datasource";
import { CategoryDataSourceLocalStorage } from "src/features/expenses/core/infrastructure/datasources/local-storage/categories.datasource";
import { ExpenseDataSourceLocalStorage } from "src/features/expenses/core/infrastructure/datasources/local-storage/expense.datasource";
import { BudgetMapperImpl } from "src/features/expenses/core/infrastructure/mappers/budget.mapper";
import { CategoryMapperImpl } from "src/features/expenses/core/infrastructure/mappers/category.mapper";
import { ExpenseMapperImpl } from "src/features/expenses/core/infrastructure/mappers/expense.mapper";
import { BudgetRepositoryImpl } from "src/features/expenses/core/infrastructure/repositories/budget.repository";
import { CategoriesRepositoryImpl } from "src/features/expenses/core/infrastructure/repositories/categories.repository";
import { ExpenseRepositoryImpl } from "src/features/expenses/core/infrastructure/repositories/expense.repository";

import { GetBudgetUseCase } from "src/features/expenses/core/application/use-cases/budget/get-budget.use-case";
import { ResetAppUseCase } from "src/features/expenses/core/application/use-cases/budget/reset-app.use-case";
import { SaveBudgetUseCase } from "src/features/expenses/core/application/use-cases/budget/save-budget.use-case";
import { GetCategoriesUseCase } from "src/features/expenses/core/application/use-cases/categories/get-categories.use-case";
import { DeleteExpenseUseCase } from "src/features/expenses/core/application/use-cases/expenses/delete-expense.use-case";
import { GetExpensesUseCase } from "src/features/expenses/core/application/use-cases/expenses/get-expenses.use-case";
import { SaveExpenseUseCase } from "src/features/expenses/core/application/use-cases/expenses/save-expense.use-case";
import { UpdateExpenseUseCase } from "src/features/expenses/core/application/use-cases/expenses/update-expense.use-case";

//* Factories
export const defaultCategoriesFactory = new DefaultCategoriesFactory(adapterUuidGenerator);

//* 1. Mappers
const expenseMapper = new ExpenseMapperImpl();
const budgetMapper = new BudgetMapperImpl();
const categoryMapper = new CategoryMapperImpl();

//* 2. DataSources
const expenseDataSource = new ExpenseDataSourceLocalStorage(expenseMapper, adapterUuidGenerator);
const budgetDataSource = new BudgetDataSourceLocalStorage(budgetMapper);
const categoriesDataSource = new CategoryDataSourceLocalStorage(defaultCategoriesFactory, categoryMapper);

//* 3. Repositories
const expenseRepository = new ExpenseRepositoryImpl(expenseDataSource);
const budgetRepository = new BudgetRepositoryImpl(budgetDataSource);
const categoriesRepository = new CategoriesRepositoryImpl(categoriesDataSource);

//* 4. Use Cases
// Expense Use Cases
const getExpensesUseCase = new GetExpensesUseCase(expenseRepository);
const saveExpenseUseCase = new SaveExpenseUseCase(expenseRepository);
const updateExpenseUseCase = new UpdateExpenseUseCase(expenseRepository);
const deleteExpenseUseCase = new DeleteExpenseUseCase(expenseRepository);

// Budget Use Cases
const getBudgetUseCase = new GetBudgetUseCase(budgetRepository);
const saveBudgetUseCase = new SaveBudgetUseCase(budgetRepository);
const resetAppUseCase = new ResetAppUseCase(budgetRepository);

// Categories Use Cases
const getCategoriesUseCase = new GetCategoriesUseCase(categoriesRepository);

//* 5. Use Cases Actions
// Expenses actions
export const ExecuteGetExpensesUseCase = getExpensesUseCase.execute.bind(getExpensesUseCase);
export const ExecuteSaveExpenseUseCase = saveExpenseUseCase.execute.bind(saveExpenseUseCase);
export const ExecuteUpdateExpenseUseCase = updateExpenseUseCase.execute.bind(updateExpenseUseCase);
export const ExecuteDeleteExpenseUseCase = deleteExpenseUseCase.execute.bind(deleteExpenseUseCase);

// Budget actions
export const ExecuteGetBudgetUseCase = getBudgetUseCase.execute.bind(getBudgetUseCase);
export const ExecuteSaveBudgetUseCase = saveBudgetUseCase.execute.bind(saveBudgetUseCase);
export const ExecuteResetAppUseCase = resetAppUseCase.execute.bind(resetAppUseCase);

// Categories actions
export const ExecuteGetCategoriesUseCase = getCategoriesUseCase.execute.bind(getCategoriesUseCase);
