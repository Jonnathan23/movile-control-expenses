import { CategoryEntity } from "src/features/expenses/core/domain/entities/category.entity";

export const categories: CategoryEntity[] = [
    new CategoryEntity("1", "Ahorro", "ahorro"),
    new CategoryEntity("2", "Comida", "comida"),
    new CategoryEntity("3", "Casa", "casa"),
    new CategoryEntity("4", "Gastos Varios", "gastos"),
    new CategoryEntity("5", "Ocio", "ocio"),
    new CategoryEntity("6", "Salud", "salud"),
    new CategoryEntity("7", "Suscripciones", "suscripciones"),
];
