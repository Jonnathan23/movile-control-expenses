import { ExpenseRepository } from "src/features/expenses/core/domain/repositories/expense.repository";
import { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";
import type { CreateExpenseDto } from "src/features/expenses/core/domain/dtos/create-expense.dto";

export class SaveExpenseUseCase {
    constructor(private readonly expenseRepository: ExpenseRepository) {}

    public execute(dto: CreateExpenseDto): ExpenseEntity {
        return this.expenseRepository.saveExpense(dto);
    }
}
