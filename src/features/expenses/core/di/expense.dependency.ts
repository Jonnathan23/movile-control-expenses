import { ExpenseMapperImpl } from "src/features/expenses/core/infrastructure/mappers/expense.mapper";
import { BudgetMapperImpl } from "src/features/expenses/core/infrastructure/mappers/budget.mapper";

import { ExpenseDataSourceImpl } from "src/features/expenses/core/infrastructure/datasources/expense.datasource";
import { BudgetDataSourceImpl } from "src/features/expenses/core/infrastructure/datasources/budget.datasource";

import { ExpenseRepositoryImpl } from "src/features/expenses/core/infrastructure/repositories/expense.repository.impl";
import { BudgetRepositoryImpl } from "src/features/expenses/core/infrastructure/repositories/budget.repository.impl";

import { GetExpensesUseCase } from "src/features/expenses/core/application/use-cases/get-expenses.use-case";
import { SaveExpenseUseCase } from "src/features/expenses/core/application/use-cases/save-expense.use-case";
import { UpdateExpenseUseCase } from "src/features/expenses/core/application/use-cases/update-expense.use-case";
import { DeleteExpenseUseCase } from "src/features/expenses/core/application/use-cases/delete-expense.use-case";

import { GetBudgetUseCase } from "src/features/expenses/core/application/use-cases/get-budget.use-case";
import { SaveBudgetUseCase } from "src/features/expenses/core/application/use-cases/save-budget.use-case";
import { ResetAppUseCase } from "src/features/expenses/core/application/use-cases/reset-app.use-case";

import { globalUuidGenerator } from "src/shared/adapters/uuid/di/uuid.dependencies";
import { DefaultCategoriesFactory } from "src/features/expenses/core/domain/factories/default-categories.factory";

export const defaultCategoriesFactory = new DefaultCategoriesFactory();
export const defaultCategories = defaultCategoriesFactory.create();

// 1. Mappers
const expenseMapper = new ExpenseMapperImpl();
const budgetMapper = new BudgetMapperImpl();

// 2. DataSources
const expenseDataSource = new ExpenseDataSourceImpl(expenseMapper);
const budgetDataSource = new BudgetDataSourceImpl(budgetMapper);

// 3. Repositories
const expenseRepository = new ExpenseRepositoryImpl(expenseDataSource);
const budgetRepository = new BudgetRepositoryImpl(budgetDataSource);

// 4. Use Cases
export const getExpensesUseCase = new GetExpensesUseCase(expenseRepository);
export const saveExpenseUseCase = new SaveExpenseUseCase(expenseRepository);
export const updateExpenseUseCase = new UpdateExpenseUseCase(expenseRepository);
export const deleteExpenseUseCase = new DeleteExpenseUseCase(expenseRepository);

export const getBudgetUseCase = new GetBudgetUseCase(budgetRepository);
export const saveBudgetUseCase = new SaveBudgetUseCase(budgetRepository);
export const resetAppUseCase = new ResetAppUseCase(budgetRepository);
