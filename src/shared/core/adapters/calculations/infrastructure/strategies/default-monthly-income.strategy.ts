import type { MonthlyIncomeStrategy } from "src/shared/core/adapters/calculations/domain/interface/strategies/monthly-income-strategy.interface";

import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";
import { TRANSACTION_TYPE } from "src/features/transactions/core/domain/enums/transaction.enum";

export class DefaultMonthlyIncomeStrategy implements MonthlyIncomeStrategy {
    public calculateMonthlyIncome(transactions: TransactionEntity[]): number {
        return transactions
            .filter((transaction) => transaction.type === TRANSACTION_TYPE.INCOME)
            .reduce((accumulatedAmount, transaction) => accumulatedAmount + transaction.amount, 0);
    }
}
