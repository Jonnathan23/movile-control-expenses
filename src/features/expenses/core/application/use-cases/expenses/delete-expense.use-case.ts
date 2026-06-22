import { ExpenseRepository } from "src/features/expenses/core/domain/repositories/expense.repository";

export class DeleteExpenseUseCase {
    constructor(private readonly expenseRepository: ExpenseRepository) {}

    public execute(id: string): Promise<void> {
        return this.expenseRepository.deleteExpense(id);
    }
}
