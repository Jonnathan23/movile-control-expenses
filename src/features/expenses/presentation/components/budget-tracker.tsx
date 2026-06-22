import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useBudget } from "src/features/expenses/presentation/hooks/use-budget.hook";

import { resetAppUseCase } from "src/features/expenses/core/di/expense.dependency";
import AmountDisplay from "src/features/expenses/presentation/components/amount-display";

export default function BudgetTracker() {
    const { state, totalExpense, remaininBudget, dispatch } = useBudget();

    const percentage = +((totalExpense / state.budget) * 100).toFixed(2);

    const handleResetApp = () => {
        resetAppUseCase.execute();
        dispatch({ type: "reset-app" });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                {
                    <CircularProgressbar
                        value={percentage}
                        styles={buildStyles({
                            pathColor: percentage > 80 ? "#DC2626" : "#3b82f6",
                            trailColor: "#F5F5F5",
                            textSize: 8,
                            textColor: percentage > 80 ? "#DC2626" : "#3b82f6",
                        })}
                        text={`${percentage}% Gastado`}
                    />
                }
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <AmountDisplay label="Presupuesto" amount={state.budget} />
                <AmountDisplay label="Disponible" amount={remaininBudget} />
                <AmountDisplay label="Gastado" amount={totalExpense} />
            </div>
        </div>
    );
}
