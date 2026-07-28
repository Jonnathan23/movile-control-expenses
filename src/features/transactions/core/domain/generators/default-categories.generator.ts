import type { UUIDHelper } from "src/shared/core/helpers/generators.helper";

import { CategoryEntity } from "src/features/transactions/core/domain/entities/category.entity";

export interface DefaultCategoriesGenerator {
    create(): CategoryEntity[];
}

export class DefaultCategoriesGeneratorImpl implements DefaultCategoriesGenerator {
    public constructor(private readonly uuidGenerator: UUIDHelper) {}

    public create(): CategoryEntity[] {
        return [
            new CategoryEntity(this.uuidGenerator(), "Alimentos", "🍔", "#f97316"),
            new CategoryEntity(this.uuidGenerator(), "Transporte", "🚗", "#3b82f6"),
            new CategoryEntity(this.uuidGenerator(), "Ocio", "🎬", "#a855f7"),
            new CategoryEntity(this.uuidGenerator(), "Salud", "💊", "#ec4899"),
            new CategoryEntity(this.uuidGenerator(), "Compras", "🛍️", "#eab308"),
            new CategoryEntity(this.uuidGenerator(), "Servicios", "⚡", "#14b8a6"),
            new CategoryEntity(this.uuidGenerator(), "Compras", "🛍️", "#eab308"),
            new CategoryEntity(this.uuidGenerator(), "Educación", "📚", "#6366f1"),
            new CategoryEntity(this.uuidGenerator(), "Otros", "📦", "#6b7280"),
            new CategoryEntity(this.uuidGenerator(), "Compras", "🛍️", "#eab308"),
        ];
    }
}
