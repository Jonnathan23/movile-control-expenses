import { useMemo } from "react";

import BudgetForm from "src/features/expenses/presentation/components/budget/budget-form";
import BudgetTracker from "src/features/expenses/presentation/components/budget/budget-tracker";
import FilterByCategory from "src/features/expenses/presentation/components/category/filter-by-category";
import ExpenseList from "src/features/expenses/presentation/components/expense/expense-list";
import ExpenseModal from "src/features/expenses/presentation/components/expense/expense-modal";
import { useBudget } from "src/features/expenses/presentation/hooks/use-budget-context.hook";

function App() {
    const { state } = useBudget();

    const isValidBudget = useMemo(() => state.budget > 0, [state]);

    return (
        <>
            <header className="bg-blue-600 py-8 max-h-72">
                <h1 className="uppercase text-center font-black text-4xl text-white">Planificador de Gastos</h1>
            </header>

            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
                {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
            </div>

            {isValidBudget && (
                <main className="max-w-3xl mx-auto py-10">
                    <FilterByCategory />
                    <ExpenseList />
                    <ExpenseModal />
                </main>
            )}
        </>
    );
}

export default App;
