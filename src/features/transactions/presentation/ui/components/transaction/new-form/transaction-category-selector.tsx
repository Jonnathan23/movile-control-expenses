import type { CategoryEntity } from "src/features/transactions/core/domain/entities/category.entity";

import { useTransactionInputs } from "src/features/transactions/presentation/hooks/logic/transaction/use-transaction-inputs.hook";

interface CategoryItemProps {
    readonly categories: CategoryEntity[];
    readonly categoryItem: CategoryEntity;
    readonly selectedId: string;
    readonly onSelect: (id: string) => () => void;
}

function CategoryItem({ categories, categoryItem, selectedId, onSelect: handleSelect }: CategoryItemProps) {
    const isSelected = selectedId ? selectedId === categoryItem.id : categories[0]?.id === categoryItem.id;
    return (
        <button
            key={categoryItem.id}
            type="button"
            onClick={handleSelect(categoryItem.id)}
            aria-pressed={isSelected}
            className="flex flex-col items-center gap-1.5 flex-shrink-0 transition-all active:scale-95"
        >
            <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                style={{
                    background: isSelected ? categoryItem.color : `${categoryItem.color}25`,
                    border: isSelected ? `2px solid ${categoryItem.color}` : "2px solid transparent",
                    transition: "all 0.2s",
                }}
                aria-hidden="true"
            >
                {categoryItem.icon}
            </div>
            <span
                className="text-[10px] font-medium text-center w-12 truncate"
                style={{ color: isSelected ? "#fff" : "#85c9c0" }}
            >
                {categoryItem.name}
            </span>
        </button>
    );
}

export function TransactionCategorySelector() {
    const { categories, categoryId: selectedId, handleCategoryClick: handleSelect } = useTransactionInputs();

    return (
        <div>
            <label className="block text-xs font-medium mb-3" style={{ color: "#85c9c0" }}>
                Categoría
            </label>
            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                {categories.map((categoryItem) => (
                    <CategoryItem
                        key={categoryItem.id}
                        categoryItem={categoryItem}
                        categories={categories}
                        selectedId={selectedId}
                        onSelect={handleSelect}
                    />
                ))}
            </div>
        </div>
    );
}
