import type { MonthlyExpensesStrategy } from "src/shared/core/adapters/calculations/domain/interface/strategies/monthly-expenses-strategy.interface";

import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";
import { TRANSACTION_TYPE } from "src/features/transactions/core/domain/enums/transaction.enum";

export class DefaultMonthlyExpensesStrategy implements MonthlyExpensesStrategy {
    public calculateMonthlyExpenses(transactions: TransactionEntity[]): number {
        return transactions
            .filter((transaction) => transaction.type === TRANSACTION_TYPE.EXPENSE)
            .reduce((accumulatedAmount, transaction) => accumulatedAmount + transaction.amount, 0);
    }
}
