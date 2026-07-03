import type { CategoryEntity } from "src/features/expenses/core/domain/entities/category.entity";

export abstract class CategoriesRepository {
    public abstract getCategories(): Promise<CategoryEntity[]>;
}
