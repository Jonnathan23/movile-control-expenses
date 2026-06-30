import { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";

import type { CreateExpenseDto } from "src/features/expenses/core/application/dtos/create-expense.dto";
import type { UpdateExpenseDto } from "src/features/expenses/core/application/dtos/update-expense.dto";

export abstract class ExpenseRepository {
    public abstract getExpenses(): Promise<ExpenseEntity[]>;
    public abstract saveExpense(dto: CreateExpenseDto): Promise<ExpenseEntity>;
    public abstract updateExpense(dto: UpdateExpenseDto): Promise<ExpenseEntity>;
    public abstract deleteExpense(id: string): Promise<void>;
}
