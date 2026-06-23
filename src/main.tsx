import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "src/index.css";
import App from "src/App.tsx";
import { BudgetProvider } from "src/features/expenses/presentation/context/budget.provider";
import { createQueryClient } from "src/config/query-client.config";
import { QueryClientProvider } from "@tanstack/react-query";

const queryClient = createQueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BudgetProvider>
                <App />
            </BudgetProvider>
        </QueryClientProvider>
    </StrictMode>,
);
