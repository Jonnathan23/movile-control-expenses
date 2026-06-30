import type { UuidStrategy } from "src/shared/core/adapters/uuid/domain/interface/uuid-strategy.interface";

import { ExpenseDataSource } from "src/features/expenses/core/domain/datasources/expense.datasource";
import { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";

import type { ExpenseMapper } from "src/features/expenses/core/infrastructure/mappers/expense.mapper";

import type { CreateExpenseDto } from "src/features/expenses/core/application/dtos/create-expense.dto";
import type { UpdateExpenseDto } from "src/features/expenses/core/application/dtos/update-expense.dto";

export class ExpenseDataSourceImpl implements ExpenseDataSource {
    private readonly storageKey = "expenses";

    public constructor(
        private readonly expenseMapper: ExpenseMapper,
        private readonly generatorUUID: UuidStrategy,
    ) {}

    public async getExpenses(): Promise<ExpenseEntity[]> {
        const stored = localStorage.getItem(this.storageKey);
        const rawData = stored ? JSON.parse(stored) : [];
        return this.expenseMapper.toArrayEntities(rawData);
    }

    public async saveExpense(dto: CreateExpenseDto): Promise<ExpenseEntity> {
        const expenses = await this.getExpenses();
        const newExpense = new ExpenseEntity(
            this.generatorUUID.generateUuid(),
            dto.expenseName,
            dto.amount,
            dto.category,
            dto.date,
        );

        expenses.push(newExpense);
        localStorage.setItem(this.storageKey, JSON.stringify(expenses));
        return newExpense;
    }

    public async updateExpense(dto: UpdateExpenseDto): Promise<ExpenseEntity> {
        const expenses = await this.getExpenses();
        const index = expenses.findIndex((exp) => exp.id === dto.id);

        if (index === -1) throw new Error(`Expense with id ${dto.id} not found`);

        const updatedExpense = new ExpenseEntity(dto.id, dto.expenseName, dto.amount, dto.category, dto.date);

        expenses[index] = updatedExpense;
        localStorage.setItem(this.storageKey, JSON.stringify(expenses));
        return updatedExpense;
    }

    public async deleteExpense(id: string): Promise<void> {
        const expenses = await this.getExpenses();
        const filtered = expenses.filter((exp) => exp.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(filtered));
    }
}
