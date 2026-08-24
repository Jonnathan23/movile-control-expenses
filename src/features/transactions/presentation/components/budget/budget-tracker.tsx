import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

import AmountDisplay from "src/features/transactions/presentation/components/budget/amount-display";
import { useBudgetTrack } from "src/features/transactions/presentation/hooks/logic/budget/budget-track.hook";
import { useBudgetContext } from "src/features/transactions/presentation/hooks/use-budget-context.hook";

import "react-circular-progressbar/dist/styles.css";

export default function BudgetTracker() {
    const { state, totalTransaction, remaininBudget, dispatch } = useBudgetContext();

    const { percentage, dangerThreshold, handleResetApp } = useBudgetTrack({
        totalTransaction,
        budget: state.budget,
        dispatch,
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                {
                    <CircularProgressbar
                        value={percentage}
                        styles={buildStyles({
                            pathColor: percentage > dangerThreshold ? "var(--tracker-danger)" : "var(--tracker-primary)",
                            trailColor: "var(--tracker-trail)",
                            textSize: 8,
                            textColor: percentage > dangerThreshold ? "var(--tracker-danger)" : "var(--tracker-primary)",
                        })}
                        text={`${percentage}% Gastado`}
                    />
                }
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-secondary w-full p-2 text-white uppercase font-bold rounded-lg"
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <AmountDisplay label="Presupuesto" amount={state.budget} />
                <AmountDisplay label="Disponible" amount={remaininBudget} />
                <AmountDisplay label="Gastado" amount={totalTransaction} />
            </div>
        </div>
    );
}
