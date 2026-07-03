import { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";
import { ExpenseRepository } from "src/features/expenses/core/domain/repositories/expense.repository";

import type { CreateExpenseDto } from "src/features/expenses/core/application/dtos/create-expense.dto";

export class SaveExpenseUseCase {
    public constructor(private readonly expenseRepository: ExpenseRepository) {}

    public execute(dto: CreateExpenseDto): Promise<ExpenseEntity> {
        return this.expenseRepository.saveExpense(dto);
    }
}
