import type { CreateExpenseDto } from "src/features/expenses/core/domain/dtos/create-expense.dto";
import type { UpdateExpenseDto } from "src/features/expenses/core/domain/dtos/update-expense.dto";
import { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";

export abstract class ExpenseDataSource {
    public abstract getExpenses(): Promise<ExpenseEntity[]>;
    public abstract saveExpense(createExpenseDto: CreateExpenseDto): Promise<ExpenseEntity>;
    public abstract updateExpense(updateExpenseDto: UpdateExpenseDto): Promise<ExpenseEntity>;
    public abstract deleteExpense(id: string): Promise<void>;
}
