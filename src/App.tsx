import { useState } from "react";

import { AccountsSidebar } from "src/shared/presentation/ui/components/accounts-sidebar";
import type { NavTab } from "src/shared/presentation/ui/components/bottom-nav";
import { BottomNav } from "src/shared/presentation/ui/components/bottom-nav";
import { SideNav } from "src/shared/presentation/ui/components/side-nav";
import { TopHeader } from "src/shared/presentation/ui/components/top-header";
import { AccountsView } from "src/shared/presentation/ui/views/accounts.view";
import { DashboardView } from "src/shared/presentation/ui/views/dashboard.view";
import { ExpensesView } from "src/shared/presentation/ui/views/expenses.view";

import { useGetAccounts } from "src/features/accounts/presentation/hooks/use-cases/accounts/get-accounts.hook";
import { useGetBudget } from "src/features/transactions/presentation/hooks/use-cases/budget/get-budget.hook";
import { useGetTransactions } from "src/features/transactions/presentation/hooks/use-cases/transactions/get-transactions.hook";
import { NewTransactionView } from "src/features/transactions/presentation/ui/views/transaction/new-transaction.view";

export default function App() {
    const { data: accounts = [], isLoading: isLoadingAccounts } = useGetAccounts();
    const { data: transactions = [], isLoading: isLoadingTransactions } = useGetTransactions();
    const { isLoading: isLoadingBudget } = useGetBudget();

    const [activeTab, setActiveTab] = useState<NavTab>("home");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isShowForm, setIsShowForm] = useState(false);

    const handleOnTabChange = (tab: NavTab): void => setActiveTab(tab);
    const handleOnNewExpense = (): void => setIsShowForm(true);
    const handleOnSidebarClose = (): void => setIsSidebarOpen(false);
    const handleOnAddAccount = (): void => setIsSidebarOpen(false);
    const handleOnMenuOpen = (): void => setIsSidebarOpen(true);
    const handleOnFormClose = (): void => setIsShowForm(false);
    const handleOnViewAllExpenses = (): void => setActiveTab("transactions");
    const handleOnOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (e.target === e.currentTarget) setIsShowForm(false);
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
            <SideNav
                activeTab={activeTab}
                onTabChange={handleOnTabChange}
                onNewTransaction={handleOnNewExpense}
                accounts={accounts}
            />

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
                    {/* Form overlay — full screen on mobile, modal-style panel on desktop */}
                    {isShowForm && (
                        <>
                            {/* Desktop: side panel */}
                            <div
                                className="hidden md:flex fixed inset-0 z-50 items-start justify-end"
                                onClick={handleOnOverlayClick}
                            >
                                <div
                                    className="h-full w-full max-w-md overflow-y-auto flex flex-col animate-slide-in-left"
                                    style={{
                                        background: "#0c3c46",
                                        borderLeft: "1px solid rgba(38,160,155,0.2)",
                                        boxShadow: "-20px 0 60px rgba(0,0,0,0.4)",
                                    }}
                                >
                                    <NewTransactionView accounts={accounts} onClose={handleOnFormClose} />
                                </div>
                            </div>

                            {/* Mobile: fullscreen */}
                            <div className="md:hidden fixed inset-0 z-50 overflow-y-auto flex flex-col bg-background">
                                <NewTransactionView accounts={accounts} onClose={handleOnFormClose} />
                            </div>
                        </>
                    )}

                    {activeTab === "home" && (
                        <DashboardView
                            accounts={accounts}
                            transactions={transactions}
                            onNewExpense={handleOnNewExpense}
                            onViewAllExpenses={handleOnViewAllExpenses}
                        />
                    )}
                    {activeTab === "transactions" && (
                        <ExpensesView accounts={accounts} transactions={transactions} onNewExpense={handleOnNewExpense} />
                    )}
                    {activeTab === "accounts" && <AccountsView accounts={accounts} transactions={transactions} />}
                    {activeTab === "more" && <MoreView />}
                </main>

                {/* Mobile bottom nav */}
                <BottomNav activeTab={activeTab} onTabChange={handleOnTabChange} onNewTransaction={handleOnNewExpense} />
            </div>
        </div>
    );
}

function MoreView() {
    const items = [
        { icon: "🎯", label: "Presupuestos", desc: "Define límites de gasto por categoría" },
        { icon: "📊", label: "Reportes", desc: "Análisis detallado de tus finanzas" },
        { icon: "🔔", label: "Notificaciones", desc: "Alertas y recordatorios" },
        { icon: "🔒", label: "Seguridad", desc: "PIN y autenticación biométrica" },
        { icon: "⚙️", label: "Configuración", desc: "Moneda, idioma y preferencias" },
        { icon: "❓", label: "Ayuda", desc: "Centro de soporte y tutoriales" },
    ];
    return (
        <div className="p-4 md:p-8 animate-slide-up">
            <div className="max-w-2xl mx-auto space-y-3">
                {items.map((item) => (
                    <button
                        key={item.label}
                        className="w-full flex items-center gap-4 p-4 rounded-2xl transition-colors hover:brightness-110 text-left"
                        style={{ background: "#1a5862", border: "1px solid rgba(38,160,155,0.15)" }}
                    >
                        <span
                            className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0"
                            style={{ background: "rgba(38,160,155,0.15)" }}
                            aria-hidden="true"
                        >
                            {item.icon}
                        </span>
                        <div>
                            <p className="font-semibold text-white text-sm">{item.label}</p>
                            <p className="text-xs" style={{ color: "#85c9c0" }}>
                                {item.desc}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
