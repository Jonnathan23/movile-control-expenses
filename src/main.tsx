import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import App from "src/App.tsx";
import { createQueryClient } from "src/config/query-client.config";
import { BudgetProvider } from "src/features/transactions/presentation/provider/budget.provider";

import "src/index.css";

const queryClient = createQueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BudgetProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </BudgetProvider>
        </QueryClientProvider>
    </StrictMode>,
);
