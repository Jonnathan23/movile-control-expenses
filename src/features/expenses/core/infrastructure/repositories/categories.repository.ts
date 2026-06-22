import type { CategoriesRepository } from "src/features/expenses/core/domain/repositories/categories.repository";
import type { CategoryDatasource } from "src/features/expenses/core/domain/datasources/category.datasource";
import type { CategoryEntity } from "src/features/expenses/core/domain/entities/category.entity";

export class CategoriesRepositoryImpl implements CategoriesRepository {
    constructor(private readonly categoryDatasource: CategoryDatasource) {}

    public getCategories(): Promise<CategoryEntity[]> {
        return this.categoryDatasource.getCategories();
    }
}
