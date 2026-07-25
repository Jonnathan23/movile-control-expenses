import type { CategoryDatasource } from "src/features/transactions/core/domain/datasources/category.datasource";
import type { CategoryEntity } from "src/features/transactions/core/domain/entities/category.entity";
import type { DefaultCategoriesFactory } from "src/features/transactions/core/domain/factories/default-categories.factory";

import type { CategoryMapper } from "src/features/transactions/core/infrastructure/mappers/category.mapper";

export class CategoryDataSourceLocalStorage implements CategoryDatasource {
    private readonly storageKey = "categories";

    public constructor(
        private readonly defaultCategoriesFactory: DefaultCategoriesFactory,
        private readonly categoryMapper: CategoryMapper,
    ) {}

    public async getCategories(): Promise<CategoryEntity[]> {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            const rawData = JSON.parse(stored) as unknown[];
            return this.categoryMapper.toArrayEntities(rawData);
        }

        const defaultCategories = this.defaultCategoriesFactory.create();
        localStorage.setItem(this.storageKey, JSON.stringify(defaultCategories));
        return defaultCategories;
    }
}
