import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

import { resetAppUseCase } from "src/features/expenses/core/di/expense.dependency";
import AmountDisplay from "src/features/expenses/presentation/components/budget/amount-display";
import { useBudget } from "src/features/expenses/presentation/hooks/use-budget-context.hook";

import "react-circular-progressbar/dist/styles.css";

export default function BudgetTracker() {
    const { state, totalExpense, remaininBudget, dispatch } = useBudget();

    const maxPercentage = 100;
    const decimalPlaces = 2;
    const dangerThreshold = 80;
    const percentage = +((totalExpense / state.budget) * maxPercentage).toFixed(decimalPlaces);

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
                            pathColor: percentage > dangerThreshold ? "#DC2626" : "#3b82f6",
                            trailColor: "#F5F5F5",
                            textSize: 8,
                            textColor: percentage > dangerThreshold ? "#DC2626" : "#3b82f6",
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
