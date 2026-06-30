import type { CategoryDatasource } from "src/features/expenses/core/domain/datasources/category.datasource";
import type { CategoryEntity } from "src/features/expenses/core/domain/entities/category.entity";
import type { CategoriesRepository } from "src/features/expenses/core/domain/repositories/categories.repository";

export class CategoriesRepositoryImpl implements CategoriesRepository {
    public constructor(private readonly categoryDatasource: CategoryDatasource) {}

    public getCategories(): Promise<CategoryEntity[]> {
        return this.categoryDatasource.getCategories();
    }
}
