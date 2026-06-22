import { ExpenseRepository } from "src/features/expenses/core/domain/repositories/expense.repository";
import { ExpenseDataSource } from "src/features/expenses/core/domain/datasources/expense.datasource";
import { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";
import type { CreateExpenseDto } from "src/features/expenses/core/domain/dtos/create-expense.dto";
import type { UpdateExpenseDto } from "src/features/expenses/core/domain/dtos/update-expense.dto";

export class ExpenseRepositoryImpl implements ExpenseRepository {
    constructor(private readonly expenseDataSource: ExpenseDataSource) {}

    public getExpenses(): Promise<ExpenseEntity[]> {
        return this.expenseDataSource.getExpenses();
    }

    public saveExpense(dto: CreateExpenseDto): Promise<ExpenseEntity> {
        return this.expenseDataSource.saveExpense(dto);
    }

    public updateExpense(dto: UpdateExpenseDto): Promise<ExpenseEntity> {
        return this.expenseDataSource.updateExpense(dto);
    }

    public deleteExpense(id: string): Promise<void> {
        return this.expenseDataSource.deleteExpense(id);
    }
}
