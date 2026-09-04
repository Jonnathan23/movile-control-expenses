import { useState } from "react";
import { useLocation } from "react-router-dom";

import { AccountsSidebar } from "src/shared/presentation/ui/components/accounts-sidebar";
import { BottomNav } from "src/shared/presentation/ui/components/bottom-nav";
import { SideNav } from "src/shared/presentation/ui/components/side-nav";
import { TopHeader } from "src/shared/presentation/ui/components/top-header";
import { AccountsView } from "src/shared/presentation/ui/views/accounts.view";
import { DashboardView } from "src/shared/presentation/ui/views/dashboard.view";
import { ExpensesView } from "src/shared/presentation/ui/views/expenses.view";
import { MoreView } from "src/shared/presentation/ui/views/more-views.view";

import { useGetAccounts } from "src/features/accounts/presentation/hooks/use-cases/accounts/get-accounts.hook";
import { useGetBudget } from "src/features/transactions/presentation/hooks/use-cases/budget/get-budget.hook";
import { useGetTransactions } from "src/features/transactions/presentation/hooks/use-cases/transactions/get-transactions.hook";

export default function App() {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { data: accounts = [], isLoading: isLoadingAccounts } = useGetAccounts();
    const { data: transactions = [], isLoading: isLoadingTransactions } = useGetTransactions();
    const { isLoading: isLoadingBudget } = useGetBudget();

    let activeTab = "home";
    if (location.pathname === "/transactions") activeTab = "transactions";
    else if (location.pathname === "/accounts") activeTab = "accounts";
    else if (location.pathname === "/more") activeTab = "more";

    const handleOnSidebarClose = (): void => setIsSidebarOpen(false);
    const handleOnAddAccount = (): void => setIsSidebarOpen(false);
    const handleOnMenuOpen = (): void => setIsSidebarOpen(true);
    const handleOnViewAllExpenses = (): void => {
        // En un futuro Layout, esto podría requerir useNavigate()
        // pero temporalmente no podemos pasarlo directo
    };

    if (isLoadingAccounts || isLoadingTransactions || isLoadingBudget) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <span className="text-white font-semibold">Cargando...</span>
            </div>
        );
    }

    let pageTitle = "";
    switch (activeTab) {
        case "home":
            pageTitle = "Inicio";
            break;
        case "transactions":
            pageTitle = "Transacciones";
            break;
        case "accounts":
            pageTitle = "Cuentas";
            break;
        case "more":
            pageTitle = "Más";
            break;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* ── Persistent left sidebar on md+ ── */}
            <SideNav accounts={accounts} />

            {/* ── Sliding accounts drawer (mobile) ── */}
            <AccountsSidebar
                accounts={accounts}
                isOpen={isSidebarOpen}
                onClose={handleOnSidebarClose}
                onAddAccount={handleOnAddAccount}
            />

            {/* ── Main content area ── */}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                {/* Top bar — visible on mobile only */}
                <div className="md:hidden">
                    <TopHeader onMenuOpen={handleOnMenuOpen} />
                </div>

                {/* Desktop top bar */}
                <header
                    className="hidden md:flex items-center justify-between px-8 py-4 border-b flex-shrink-0"
                    style={{ borderColor: "rgba(38,160,155,0.15)" }}
                >
                    <h1 className="text-xl font-bold text-white">{pageTitle}</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-sm" style={{ color: "#85c9c0" }}>
                            Julio 2025
                        </span>
                    </div>
                </header>

                {/* Scrollable page content */}
                <main id="main-content" className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                    {activeTab === "home" && (
                        <DashboardView
                            accounts={accounts}
                            transactions={transactions}
                            onViewAllExpenses={handleOnViewAllExpenses}
                        />
                    )}
                    {activeTab === "transactions" && <ExpensesView accounts={accounts} transactions={transactions} />}
                    {activeTab === "accounts" && <AccountsView accounts={accounts} transactions={transactions} />}
                    {activeTab === "more" && <MoreView />}
                </main>

                {/* Mobile bottom nav */}
                <BottomNav />
            </div>
        </div>
    );
}
