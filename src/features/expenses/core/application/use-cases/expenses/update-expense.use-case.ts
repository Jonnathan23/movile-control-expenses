import { ExpenseRepository } from "src/features/expenses/core/domain/repositories/expense.repository";
import { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";
import type { UpdateExpenseDto } from "src/features/expenses/core/domain/dtos/update-expense.dto";

export class UpdateExpenseUseCase {
    constructor(private readonly expenseRepository: ExpenseRepository) {}

    public execute(dto: UpdateExpenseDto): ExpenseEntity {
        return this.expenseRepository.updateExpense(dto);
    }
}
