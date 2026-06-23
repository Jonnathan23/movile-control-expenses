import { useExpenseList } from "src/features/expenses/presentation/hooks/logic/expense/use-expense-list.hook";
import ExpenseDetail from "src/features/expenses/presentation/components/expense/expense-detail";

export default function ExpenseList() {
    const { filteredExpenses, isEmpty } = useExpenseList();

    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
            {isEmpty ? (
                <p className="text-gray-600 text-2xl  font-bold">No hay gastos</p>
            ) : (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">Listado de gastos</p>

                    {filteredExpenses.map((expense) => (
                        <ExpenseDetail key={expense.id} expense={expense} />
                    ))}
                </>
            )}
        </div>
    );
}
