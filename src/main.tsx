import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "src/index.css";
import App from "src/App.tsx";
import { BudgetProvider } from "src/features/expenses/presentation/context/budget.provider";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BudgetProvider>
            <App />
        </BudgetProvider>
    </StrictMode>,
);
