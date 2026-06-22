import { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";
import type { CreateExpenseDto } from "src/features/expenses/core/domain/dtos/create-expense.dto";
import type { UpdateExpenseDto } from "src/features/expenses/core/domain/dtos/update-expense.dto";

export abstract class ExpenseRepository {
    abstract getExpenses(): Promise<ExpenseEntity[]>;
    abstract saveExpense(dto: CreateExpenseDto): Promise<ExpenseEntity>;
    abstract updateExpense(dto: UpdateExpenseDto): Promise<ExpenseEntity>;
    abstract deleteExpense(id: string): Promise<void>;
}
