import { ExpenseRepository } from "src/features/expenses/core/domain/repositories/expense.repository";
import { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";

export class GetExpensesUseCase {
    constructor(private readonly expenseRepository: ExpenseRepository) {}

    public execute(): Promise<ExpenseEntity[]> {
        return this.expenseRepository.getExpenses();
    }
}
