import { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";
import { ExpenseRepository } from "src/features/expenses/core/domain/repositories/expense.repository";

import type { UpdateExpenseDto } from "src/features/expenses/core/application/dtos/update-expense.dto";

export class UpdateExpenseUseCase {
    public constructor(private readonly expenseRepository: ExpenseRepository) {}

    public execute(dto: UpdateExpenseDto): Promise<ExpenseEntity> {
        return this.expenseRepository.updateExpense(dto);
    }
}
