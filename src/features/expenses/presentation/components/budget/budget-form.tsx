import { useBudgetForm } from "src/features/expenses/presentation/hooks/forms/budget/use-budget-form.hook";

export default function BudgetForm() {
    const { budget, isValid, handleChange, handleSubmit } = useBudgetForm();

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label className="text-4xl text-blue-600 font-bold text-center" htmlFor="budget">
                    Definir Presupuesto
                </label>
                <input
                    id="budget"
                    className="w-full bg-white border border-gray-200 p-2"
                    type="number"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                value="Definir presupuesto"
                className=" bg-blue-600 hover:bg-blue-700 transition-colors text-white w-full cursor-pointer p-2 font-black uppercase disabled:opacity-40"
                disabled={isValid}
            />
        </form>
    );
}
