import type { CategoryEntity } from "src/features/expenses/core/domain/entities/category.entity";
import type { CategoriesRepository } from "src/features/expenses/core/domain/repositories/categories.repository";

export class GetCategoriesUseCase {
    constructor(private readonly categoriesRepository: CategoriesRepository) {}

    public async execute(): Promise<CategoryEntity[]> {
        return this.categoriesRepository.getCategories();
    }
}
