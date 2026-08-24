import type { UUIDHelper } from "src/shared/core/helpers/generators.helper";

import { CategoryEntity } from "src/features/transactions/core/domain/entities/category.entity";

export interface DefaultCategoriesGenerator {
    create(): CategoryEntity[];
}

export class DefaultCategoriesGeneratorImpl implements DefaultCategoriesGenerator {
    public constructor(private readonly uuidGenerator: UUIDHelper) {}

    public create(): CategoryEntity[] {
        return [
            new CategoryEntity({ id: this.uuidGenerator(), name: "Alimentos", icon: "🍔", color: "#f97316" }),
            new CategoryEntity({ id: this.uuidGenerator(), name: "Transporte", icon: "🚗", color: "#3b82f6" }),
            new CategoryEntity({ id: this.uuidGenerator(), name: "Ocio", icon: "🎬", color: "#a855f7" }),
            new CategoryEntity({ id: this.uuidGenerator(), name: "Salud", icon: "💊", color: "#ec4899" }),
            new CategoryEntity({ id: this.uuidGenerator(), name: "Compras", icon: "🛍️", color: "#eab308" }),
            new CategoryEntity({ id: this.uuidGenerator(), name: "Servicios", icon: "⚡", color: "#14b8a6" }),
            new CategoryEntity({ id: this.uuidGenerator(), name: "Compras", icon: "🛍️", color: "#eab308" }),
            new CategoryEntity({ id: this.uuidGenerator(), name: "Educación", icon: "📚", color: "#6366f1" }),
            new CategoryEntity({ id: this.uuidGenerator(), name: "Otros", icon: "📦", color: "#6b7280" }),
            new CategoryEntity({ id: this.uuidGenerator(), name: "Compras", icon: "🛍️", color: "#eab308" }),
        ];
    }
}
