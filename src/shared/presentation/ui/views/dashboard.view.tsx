import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowDownRight, ChevronDown, Eye, EyeOff, Wallet } from "lucide-react";

import { calculateMonthlyExpenses, calculateMonthlyIncome, calculateTotalNet } from "src/shared/core/helpers/calculations.helper";
import { currencyFormatHelper, dateFormatHelper, timeFormatHelper } from "src/shared/core/helpers/format.helper";
import { ProgressRing } from "src/shared/presentation/ui/components/progress-ring";

import type { AccountEntity } from "src/features/accounts/core/domain/entities/account.entity";
import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

import { useGetCategories } from "src/features/transactions/presentation/hooks/use-cases/categories/get-categories.hook";
import { NewTransactionView } from "src/features/transactions/presentation/ui/views/transaction/new-transaction.view";

const MONTHLY_BUDGET = 2000;
const MAX_SCORE = 100;
const RECENT_EXPENSES_LIMIT = 5;
const PROGRESS_RING_SIZE = 180;
const PROGRESS_RING_STROKE_WIDTH = 14;

const FALLBACK_CATEGORY = { icon: "📦", color: "#6b7280" };

interface DashboardViewProps {
    readonly accounts: AccountEntity[];
    readonly transactions: TransactionEntity[];
    readonly onViewAllExpenses: () => void;
}

export function DashboardView(props: DashboardViewProps) {
    const { accounts, transactions, onViewAllExpenses } = props;

    const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: categories } = useGetCategories();

    const totalNet = calculateTotalNet(accounts);
    const totalSpent = calculateMonthlyExpenses(transactions);
    const totalIncome = calculateMonthlyIncome(transactions);
    const available = totalIncome - totalSpent;
    const pctSpent = Math.min(MAX_SCORE, Math.round((totalSpent / MONTHLY_BUDGET) * MAX_SCORE));

    const recentExpenses = transactions
        .filter((t) => {
            return t.type === "expense";
        })
        .slice(0, RECENT_EXPENSES_LIMIT);

    const handleToggleBalance = () => {
        setIsBalanceVisible((prev) => {
            return !prev;
        });
    };

    const handleViewAllExpensesClick = () => {
        onViewAllExpenses();
    };

    const isShowForm = searchParams.get("action") === "new";

    const handleNewExpenseClick = () => {
        setSearchParams({ action: "new" });
    };

    const handleOnFormClose = (): void => {
        setSearchParams((prev) => {
            prev.delete("action");
            return prev;
        });
    };

    const handleOnOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (e.target === e.currentTarget) handleOnFormClose();
    };

    return (
        <div className="p-4 md:p-8 pb-6 animate-slide-up">
            {/* Form overlay */}
            {isShowForm && (
                <>
                    {/* Desktop: side panel */}
                    <div className="hidden md:flex fixed inset-0 z-50 items-start justify-end" onClick={handleOnOverlayClick}>
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

            {/* ─── Desktop: 2-column grid ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Left / top column */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                    {/* Patrimony header */}
                    <div className="rounded-2xl p-5" style={{ background: "#1a5862", border: "1px solid rgba(38,160,155,0.2)" }}>
                        <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium" style={{ color: "#85c9c0" }}>
                                Patrimonio Total
                            </p>
                            <button
                                onClick={handleToggleBalance}
                                aria-label={isBalanceVisible ? "Ocultar saldo" : "Mostrar saldo"}
                                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                            >
                                {isBalanceVisible ? <Eye size={16} color="#85c9c0" /> : <EyeOff size={16} color="#85c9c0" />}
                            </button>
                        </div>
                        <p className="text-3xl font-bold text-white mb-3">
                            {isBalanceVisible ? currencyFormatHelper(totalNet) : "•••••"}
                        </p>
                        <button
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors hover:bg-white/10"
                            style={{ background: "rgba(38,160,155,0.15)", color: "#39b8a2" }}
                        >
                            Todas las cuentas
                            <ChevronDown size={12} />
                        </button>
                    </div>

                    {/* Summary stat cards */}
                    <div className="grid grid-cols-2 gap-3">
                        <div
                            className="p-4 rounded-2xl"
                            style={{ background: "#1a5862", border: "1px solid rgba(239,68,68,0.2)" }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div
                                    className="w-7 h-7 rounded-full flex items-center justify-center"
                                    style={{ background: "rgba(239,68,68,0.15)" }}
                                >
                                    <ArrowDownRight size={14} color="#ef4444" />
                                </div>
                                <span className="text-xs font-medium" style={{ color: "#85c9c0" }}>
                                    Gastado
                                </span>
                            </div>
                            <p className="text-base font-bold" style={{ color: "#ef4444" }}>
                                {currencyFormatHelper(totalSpent)}
                            </p>
                            <p className="text-[10px] mt-0.5" style={{ color: "#85c9c0" }}>
                                de {currencyFormatHelper(MONTHLY_BUDGET)}
                            </p>
                        </div>

                        <div
                            className="p-4 rounded-2xl"
                            style={{ background: "#1a5862", border: "1px solid rgba(57,184,162,0.2)" }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div
                                    className="w-7 h-7 rounded-full flex items-center justify-center"
                                    style={{ background: "rgba(57,184,162,0.15)" }}
                                >
                                    <Wallet size={14} color="#39b8a2" />
                                </div>
                                <span className="text-xs font-medium" style={{ color: "#85c9c0" }}>
                                    Disponible
                                </span>
                            </div>
                            <p className="text-base font-bold" style={{ color: available >= 0 ? "#39b8a2" : "#ef4444" }}>
                                {currencyFormatHelper(available)}
                            </p>
                            <p className="text-[10px] mt-0.5" style={{ color: "#85c9c0" }}>
                                este mes
                            </p>
                        </div>
                    </div>

                    {/* Recent expenses */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-base font-bold text-white">Gastos Recientes</h2>
                            <button
                                onClick={handleViewAllExpensesClick}
                                className="text-xs font-medium transition-colors hover:opacity-80"
                                style={{ color: "#39b8a2" }}
                            >
                                Ver todos
                            </button>
                        </div>
                        <div className="space-y-2">
                            {recentExpenses.map((tx) => {
                                const category = categories?.find((c) => c.name === tx.categoryName) ?? FALLBACK_CATEGORY;
                                const account = accounts.find((a) => {
                                    return a.id === tx.accountId;
                                });
                                return (
                                    <TransactionItem
                                        key={tx.id}
                                        categoryIcon={category.icon}
                                        categoryColor={category.color}
                                        description={tx.description}
                                        date={dateFormatHelper(tx.date)}
                                        time={timeFormatHelper(tx.date)}
                                        accountName={account?.name ?? "—"}
                                        amount={tx.amount}
                                        type={tx.type}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* New expense CTA */}
                    <button
                        onClick={handleNewExpenseClick}
                        className="w-full py-4 rounded-2xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] hover:brightness-110"
                        style={{
                            background: "linear-gradient(135deg, #39b8a2, #26a09b)",
                            boxShadow: "0 4px 20px rgba(38,160,155,0.35)",
                        }}
                    >
                        + Nuevo Gasto
                    </button>
                </div>

                {/* Right column — progress ring, only shown on lg+ */}
                <div className="hidden lg:flex flex-col gap-5">
                    <div
                        className="rounded-2xl p-5 flex flex-col items-center gap-4"
                        style={{ background: "#1a5862", border: "1px solid rgba(38,160,155,0.2)" }}
                    >
                        <p className="text-sm font-semibold text-white self-start">Presupuesto Mensual</p>
                        <ProgressRing percentage={pctSpent} size={PROGRESS_RING_SIZE} strokeWidth={PROGRESS_RING_STROKE_WIDTH} />
                        <div className="w-full space-y-2">
                            <div className="flex justify-between text-xs">
                                <span style={{ color: "#85c9c0" }}>Gastado</span>
                                <span style={{ color: "#ef4444" }}>{currencyFormatHelper(totalSpent)}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span style={{ color: "#85c9c0" }}>Disponible</span>
                                <span style={{ color: "#39b8a2" }}>{currencyFormatHelper(available)}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span style={{ color: "#85c9c0" }}>Presupuesto</span>
                                <span className="text-white">{currencyFormatHelper(MONTHLY_BUDGET)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Account quick list */}
                    <div className="rounded-2xl p-5" style={{ background: "#1a5862", border: "1px solid rgba(38,160,155,0.2)" }}>
                        <p className="text-sm font-semibold text-white mb-3">Cuentas</p>
                        <div className="space-y-2">
                            {accounts.map((acc) => {
                                return (
                                    <div key={acc.id} className="flex items-center gap-3">
                                        <span className="text-xl" aria-hidden="true">
                                            {acc.icon}
                                        </span>
                                        <span className="flex-1 text-xs text-white truncate">{acc.name}</span>
                                        <span
                                            className="text-xs font-semibold"
                                            style={{ color: acc.balance >= 0 ? "#39b8a2" : "#ef4444" }}
                                        >
                                            {currencyFormatHelper(acc.balance)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile-only progress ring (shown below stats on small screens) */}
            <div className="lg:hidden flex flex-col items-center gap-4 mt-5">
                <ProgressRing percentage={pctSpent} size={PROGRESS_RING_SIZE} strokeWidth={PROGRESS_RING_STROKE_WIDTH} />
            </div>
        </div>
    );
}

interface TransactionItemProps {
    readonly categoryIcon: string;
    readonly categoryColor: string;
    readonly description: string;
    readonly date: string;
    readonly time: string;
    readonly accountName: string;
    readonly amount: number;
    readonly type: "expense" | "income";
}

function TransactionItem(props: TransactionItemProps) {
    const { categoryIcon, categoryColor, description, date, time, accountName, amount, type } = props;

    const isExpense = type === "expense";
    return (
        <div
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ background: "#1a5862", border: "1px solid rgba(38,160,155,0.12)" }}
        >
            {/* Category icon */}
            <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: `${categoryColor}25` }}
                aria-hidden="true"
            >
                {categoryIcon}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{description}</p>
                <p className="text-xs" style={{ color: "#85c9c0" }}>
                    {date} · {time} · <span style={{ color: "#dde8e6" }}>{accountName}</span>
                </p>
            </div>

            {/* Amount */}
            <p className="text-sm font-bold flex-shrink-0" style={{ color: isExpense ? "#ef4444" : "#39b8a2" }}>
                {isExpense ? "-" : "+"}
                {currencyFormatHelper(amount)}
            </p>
        </div>
    );
}
