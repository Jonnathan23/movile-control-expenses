import type { CategoryDatasource } from "src/features/transactions/core/domain/datasources/category.datasource";
import type { CategoryEntity } from "src/features/transactions/core/domain/entities/category.entity";
import type { CategoriesRepository } from "src/features/transactions/core/domain/repositories/categories.repository";

export class CategoriesRepositoryImpl implements CategoriesRepository {
    public constructor(private readonly categoryDatasource: CategoryDatasource) {}

    public getCategories(): Promise<CategoryEntity[]> {
        return this.categoryDatasource.getCategories();
    }
}
