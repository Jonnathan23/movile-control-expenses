import { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";
import { ExpenseRepository } from "src/features/expenses/core/domain/repositories/expense.repository";

export class GetExpensesUseCase {
    public constructor(private readonly expenseRepository: ExpenseRepository) {}

    public execute(): Promise<ExpenseEntity[]> {
        return this.expenseRepository.getExpenses();
    }
}
