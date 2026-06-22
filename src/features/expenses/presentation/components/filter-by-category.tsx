import type { ChangeEvent } from "react";

import { useBudget } from "src/features/expenses/presentation/hooks/use-budget.hook";

export default function FilterByCategory() {
    const { dispatch, state } = useBudget();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: "add-filter-category", payload: { id: e.target.value } });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-10">
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">Filtrar Gastos</label>
                    <select id="category" className="bg-slate-10 p-3 flex-1 rounded" onChange={handleChange}>
                        <option value="">Todas las categorias</option>
                        {state.categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    );
}
