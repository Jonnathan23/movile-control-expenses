import type { MonthlyExpensesGenerator } from "src/shared/core/adapters/calculations/domain/interface/generators/monthly-expenses-generator.interface";
import type { MonthlyIncomeGenerator } from "src/shared/core/adapters/calculations/domain/interface/generators/monthly-income-generator.interface";
import type { TotalNetGenerator } from "src/shared/core/adapters/calculations/domain/interface/generators/total-net-generator.interface";

import { MonthlyExpensesGeneratorSingleton } from "src/shared/core/adapters/calculations/infrastructure/generator/monthly-expenses.generator";
import { MonthlyIncomeGeneratorSingleton } from "src/shared/core/adapters/calculations/infrastructure/generator/monthly-income.generator";
import { TotalNetGeneratorSingleton } from "src/shared/core/adapters/calculations/infrastructure/generator/total-net.generator";

export const adapterTotalNetGenerator: TotalNetGenerator = TotalNetGeneratorSingleton.getInstance();
export const adapterMonthlyExpensesGenerator: MonthlyExpensesGenerator = MonthlyExpensesGeneratorSingleton.getInstance();
export const adapterMonthlyIncomeGenerator: MonthlyIncomeGenerator = MonthlyIncomeGeneratorSingleton.getInstance();
