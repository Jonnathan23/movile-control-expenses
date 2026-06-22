import { ExpenseRepository } from "src/features/expenses/core/domain/repositories/expense.repository";

export class DeleteExpenseUseCase {
    constructor(private readonly expenseRepository: ExpenseRepository) {}

    public execute(id: string): void {
        this.expenseRepository.deleteExpense(id);
    }
}
