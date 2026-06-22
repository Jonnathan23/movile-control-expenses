import { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";
import type { CreateExpenseDto } from "src/features/expenses/core/domain/dtos/create-expense.dto";
import type { UpdateExpenseDto } from "src/features/expenses/core/domain/dtos/update-expense.dto";

export abstract class ExpenseRepository {
    abstract getExpenses(): ExpenseEntity[];
    abstract saveExpense(dto: CreateExpenseDto): ExpenseEntity;
    abstract updateExpense(dto: UpdateExpenseDto): ExpenseEntity;
    abstract deleteExpense(id: string): void;
}
