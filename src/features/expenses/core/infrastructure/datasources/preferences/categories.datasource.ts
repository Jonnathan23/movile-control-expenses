import { Preferences } from "@capacitor/preferences";

import type { CategoryDatasource } from "src/features/expenses/core/domain/datasources/category.datasource";
import type { CategoryEntity } from "src/features/expenses/core/domain/entities/category.entity";
import type { DefaultCategoriesFactory } from "src/features/expenses/core/domain/factories/default-categories.factory";

import type { CategoryMapper } from "src/features/expenses/core/infrastructure/mappers/category.mapper";

export class CategoryDataSourcePreferences implements CategoryDatasource {
    private readonly storageKey = "categories";

    public constructor(
        private readonly defaultCategoriesFactory: DefaultCategoriesFactory,
        private readonly categoryMapper: CategoryMapper,
    ) {}

    public async getCategories(): Promise<CategoryEntity[]> {
        const { value } = await Preferences.get({ key: this.storageKey });
        if (value) {
            const rawData = JSON.parse(value) as unknown[];
            return this.categoryMapper.toArrayEntities(rawData);
        }

        const defaultCategories = this.defaultCategoriesFactory.create();
        await Preferences.set({
            key: this.storageKey,
            value: JSON.stringify(defaultCategories),
        });
        return defaultCategories;
    }
}
