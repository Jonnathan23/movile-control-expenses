import { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";

import type { CreateExpenseDto } from "src/features/expenses/core/application/dtos/create-expense.dto";
import type { UpdateExpenseDto } from "src/features/expenses/core/application/dtos/update-expense.dto";

export abstract class ExpenseDataSource {
    public abstract getExpenses(): Promise<ExpenseEntity[]>;
    public abstract saveExpense(createExpenseDto: CreateExpenseDto): Promise<ExpenseEntity>;
    public abstract updateExpense(updateExpenseDto: UpdateExpenseDto): Promise<ExpenseEntity>;
    public abstract deleteExpense(id: string): Promise<void>;
}
