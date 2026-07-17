import { Preferences } from "@capacitor/preferences";

import type { UUIDHelper } from "src/shared/core/helpers/generators.helper";

import { ExpenseDataSource } from "src/features/expenses/core/domain/datasources/expense.datasource";
import { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";

import type { ExpenseMapper } from "src/features/expenses/core/infrastructure/mappers/expense.mapper";

import type { CreateExpenseDto } from "src/features/expenses/core/application/dtos/create-expense.dto";
import type { UpdateExpenseDto } from "src/features/expenses/core/application/dtos/update-expense.dto";

export class ExpenseDataSourcePreferences implements ExpenseDataSource {
    private readonly storageKey = "expenses";

    public constructor(
        private readonly expenseMapper: ExpenseMapper,
        private readonly generatorUUID: UUIDHelper,
    ) {}

    public async getExpenses(): Promise<ExpenseEntity[]> {
        const { value } = await Preferences.get({ key: this.storageKey });
        const rawData = value ? JSON.parse(value) : [];
        return this.expenseMapper.toArrayEntities(rawData);
    }

    public async saveExpense(dto: CreateExpenseDto): Promise<ExpenseEntity> {
        const expenses = await this.getExpenses();
        const newExpense = new ExpenseEntity(this.generatorUUID(), dto.expenseName, dto.amount, dto.category, dto.date);

        expenses.push(newExpense);
        await Preferences.set({
            key: this.storageKey,
            value: JSON.stringify(expenses),
        });
        return newExpense;
    }

    public async updateExpense(dto: UpdateExpenseDto): Promise<ExpenseEntity> {
        const expenses = await this.getExpenses();
        const index = expenses.findIndex((exp) => exp.id === dto.id);

        if (index === -1) throw new Error(`Expense with id ${dto.id} not found`);

        const updatedExpense = new ExpenseEntity(dto.id, dto.expenseName, dto.amount, dto.category, dto.date);

        expenses[index] = updatedExpense;
        await Preferences.set({
            key: this.storageKey,
            value: JSON.stringify(expenses),
        });
        return updatedExpense;
    }

    public async deleteExpense(id: string): Promise<void> {
        const expenses = await this.getExpenses();
        const filtered = expenses.filter((exp) => exp.id !== id);
        await Preferences.set({
            key: this.storageKey,
            value: JSON.stringify(filtered),
        });
    }
}
