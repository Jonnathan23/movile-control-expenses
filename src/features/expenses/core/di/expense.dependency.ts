import { ExpenseMapperImpl } from "src/features/expenses/core/infrastructure/mappers/expense.mapper";
import { BudgetMapperImpl } from "src/features/expenses/core/infrastructure/mappers/budget.mapper";

import { ExpenseDataSourceImpl } from "src/features/expenses/core/infrastructure/datasources/expense.datasource";
import { BudgetDataSourceImpl } from "src/features/expenses/core/infrastructure/datasources/budget.datasource";

import { ExpenseRepositoryImpl } from "src/features/expenses/core/infrastructure/repositories/expense.repository.impl";
import { BudgetRepositoryImpl } from "src/features/expenses/core/infrastructure/repositories/budget.repository.impl";

import { GetExpensesUseCase } from "src/features/expenses/core/application/use-cases/expenses/get-expenses.use-case";
import { SaveExpenseUseCase } from "src/features/expenses/core/application/use-cases/expenses/save-expense.use-case";
import { UpdateExpenseUseCase } from "src/features/expenses/core/application/use-cases/expenses/update-expense.use-case";
import { DeleteExpenseUseCase } from "src/features/expenses/core/application/use-cases/expenses/delete-expense.use-case";

import { GetBudgetUseCase } from "src/features/expenses/core/application/use-cases/budget/get-budget.use-case";
import { SaveBudgetUseCase } from "src/features/expenses/core/application/use-cases/budget/save-budget.use-case";
import { ResetAppUseCase } from "src/features/expenses/core/application/use-cases/budget/reset-app.use-case";

import { DefaultCategoriesFactory } from "src/features/expenses/core/domain/factories/default-categories.factory";
import { CategoryDataSourceImpl } from "src/features/expenses/core/infrastructure/datasources/categories.datasource";
import { CategoriesRepositoryImpl } from "src/features/expenses/core/infrastructure/repositories/categories.repository";
import { GetCategoriesUseCase } from "src/features/expenses/core/application/use-cases/categories/get-categories.use-case";

import { CategoryMapperImpl } from "src/features/expenses/core/infrastructure/mappers/category.mapper";
import { globalUuidGenerator } from "src/shared/core/helpers/generators.helper";

//* Factories
export const defaultCategoriesFactory = new DefaultCategoriesFactory(globalUuidGenerator);

//* 1. Mappers
const expenseMapper = new ExpenseMapperImpl();
const budgetMapper = new BudgetMapperImpl();
const categoryMapper = new CategoryMapperImpl();

//* 2. DataSources
const expenseDataSource = new ExpenseDataSourceImpl(expenseMapper);
const budgetDataSource = new BudgetDataSourceImpl(budgetMapper);
const categoriesDataSource = new CategoryDataSourceImpl(defaultCategoriesFactory, categoryMapper);

//* 3. Repositories
const expenseRepository = new ExpenseRepositoryImpl(expenseDataSource);
const budgetRepository = new BudgetRepositoryImpl(budgetDataSource);
const categoriesRepository = new CategoriesRepositoryImpl(categoriesDataSource);

//* 4. Use Cases
// Expense Use Cases
export const getExpensesUseCase = new GetExpensesUseCase(expenseRepository);
export const saveExpenseUseCase = new SaveExpenseUseCase(expenseRepository);
export const updateExpenseUseCase = new UpdateExpenseUseCase(expenseRepository);
export const deleteExpenseUseCase = new DeleteExpenseUseCase(expenseRepository);

// Budget Use Cases
export const getBudgetUseCase = new GetBudgetUseCase(budgetRepository);
export const saveBudgetUseCase = new SaveBudgetUseCase(budgetRepository);
export const resetAppUseCase = new ResetAppUseCase(budgetRepository);

// Categories Use Cases
export const getCategoriesUseCase = new GetCategoriesUseCase(categoriesRepository);
