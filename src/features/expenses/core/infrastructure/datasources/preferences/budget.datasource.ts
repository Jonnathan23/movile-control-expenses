import { Preferences } from "@capacitor/preferences";

import { BudgetDataSource } from "src/features/expenses/core/domain/datasources/budget.datasource";
import { BudgetEntity } from "src/features/expenses/core/domain/entities/budget.entity";

import type { BudgetMapper } from "src/features/expenses/core/infrastructure/mappers/budget.mapper";

import type { CreateBudgetDto } from "src/features/expenses/core/application/dtos/create-budget.dto";

export class BudgetDataSourcePreferences implements BudgetDataSource {
    private readonly storageKey = "budget";

    public constructor(private readonly budgetMapper: BudgetMapper) {}

    public async getBudget(): Promise<BudgetEntity> {
        const { value } = await Preferences.get({ key: this.storageKey });
        const rawData = value ? JSON.parse(value) : 0;
        return this.budgetMapper.toEntity(rawData);
    }

    public async saveBudget(createBudgetDto: CreateBudgetDto): Promise<BudgetEntity> {
        await Preferences.set({
            key: this.storageKey,
            value: JSON.stringify(createBudgetDto.amount),
        });
        return new BudgetEntity(createBudgetDto.amount);
    }

    public async resetAll(): Promise<void> {
        await Preferences.remove({ key: this.storageKey });
        await Preferences.remove({ key: "expenses" });
    }
}
