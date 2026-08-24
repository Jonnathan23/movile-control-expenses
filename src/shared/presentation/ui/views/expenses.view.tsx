"use client";

import { useState } from "react";

import { currencyFormatHelper, dateFormatHelper, timeFormatHelper } from "src/shared/core/helpers/format.helper";

import type { AccountEntity } from "src/features/accounts/core/domain/entities/account.entity";
import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

import { useGetCategories } from "src/features/transactions/presentation/hooks/use-cases/categories/get-categories.hook";

interface ExpensesViewProps {
    readonly accounts: AccountEntity[];
    readonly transactions: TransactionEntity[];
    readonly onNewExpense: () => void;
}

type Filter = "all" | "expense" | "income";

export function ExpensesView({ accounts, transactions, onNewExpense }: ExpensesViewProps) {
    //TODO: quitar el filtro en la vista y delegar esa logica al caso de uso (datasource)
    const { data: categories = [] } = useGetCategories();
    const [filter, setFilter] = useState<Filter>("all");
    const [category, setCategory] = useState<string>("all");

    const filtered = transactions.filter((transaction) => {
        if (filter !== "all" && transaction.type !== filter) return false;
        if (category !== "all" && transaction.categoryName !== category) return false;
        return true;
    });

    const totalShown = filtered.reduce((sum, transaction) => {
        return transaction.type === "expense" ? sum - transaction.amount : sum + transaction.amount;
    }, 0);

    //* handlers
    const handleFilterClick = (filterType: Filter) => () => {
        setFilter(filterType);
    };

    const handleCategoryClick = (categoryName: string) => () => {
        setCategory(categoryName);
    };

    const handleNewExpenseClick = () => {
        onNewExpense();
    };

    return (
        <div className="flex flex-col gap-5 p-4 md:p-8 pb-6 animate-slide-up max-w-4xl mx-auto w-full">
            {/* Summary banner */}
            <div className="rounded-2xl p-4" style={{ background: "#1a5862", border: "1px solid rgba(38,160,155,0.2)" }}>
                <p className="text-xs font-medium mb-1" style={{ color: "#85c9c0" }}>
                    Balance mostrado
                </p>
                <p className="text-2xl font-bold" style={{ color: totalShown >= 0 ? "#39b8a2" : "#ef4444" }}>
                    {totalShown < 0 ? "-" : "+"}
                    {currencyFormatHelper(Math.abs(totalShown))}
                </p>
                <p className="text-xs mt-1" style={{ color: "#85c9c0" }}>
                    {filtered.length} movimiento{filtered.length !== 1 ? "s" : ""}
                </p>
            </div>

            {/* Type filters */}
            <div className="flex gap-2">
                {(["all", "expense", "income"] as Filter[]).map((filterOption) => (
                    <button
                        key={filterOption}
                        onClick={handleFilterClick(filterOption)}
                        aria-pressed={filter === filterOption}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                        style={{
                            background:
                                filter === filterOption
                                    ? filterOption === "expense"
                                        ? "#ef4444"
                                        : filterOption === "income"
                                          ? "#26a09b"
                                          : "#1a5862"
                                    : "rgba(38,160,155,0.1)",
                            color: filter === filterOption ? "#fff" : "#85c9c0",
                            border: "1px solid",
                            borderColor:
                                filter === filterOption
                                    ? filterOption === "expense"
                                        ? "#ef4444"
                                        : filterOption === "income"
                                          ? "#26a09b"
                                          : "rgba(38,160,155,0.3)"
                                    : "transparent",
                        }}
                    >
                        {filterOption === "all" ? "Todos" : filterOption === "expense" ? "Gastos" : "Ingresos"}
                    </button>
                ))}
            </div>

            {/* Category chips */}
            <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                <CategoryChip
                    label="Todas"
                    isActive={category === "all"}
                    onClick={handleCategoryClick("all")}
                    color="#26a09b"
                    icon="🗂️"
                />
                {categories.map((categoryItem) => (
                    <CategoryChip
                        key={categoryItem.id}
                        label={categoryItem.name}
                        isActive={category === categoryItem.name}
                        onClick={handleCategoryClick(categoryItem.name)}
                        color={categoryItem.color}
                        icon={categoryItem.icon}
                    />
                ))}
            </div>

            {/* Transaction list */}
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <span className="text-5xl" aria-hidden="true">
                        🔍
                    </span>
                    <p className="text-sm font-medium" style={{ color: "#85c9c0" }}>
                        Sin movimientos
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    {filtered.map((transaction) => {
                        const transactionCategory = categories.find(
                            (categoryData) => categoryData.name === transaction.categoryName,
                        ) ?? {
                            color: "#85c9c0",
                            icon: "❓",
                        };
                        const account = accounts.find((accountData) => accountData.id === transaction.accountId);
                        return (
                            <div
                                key={transaction.id}
                                className="flex items-center gap-3 p-3 rounded-xl"
                                style={{ background: "#1a5862", border: "1px solid rgba(38,160,155,0.12)" }}
                            >
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                                    style={{ background: `${transactionCategory.color}25` }}
                                    aria-hidden="true"
                                >
                                    {transactionCategory.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-white truncate">{transaction.description}</p>
                                    <p className="text-xs" style={{ color: "#85c9c0" }}>
                                        {dateFormatHelper(new Date(transaction.date))} ·{" "}
                                        {timeFormatHelper(new Date(transaction.date))} ·{" "}
                                        <span style={{ color: "#dde8e6" }}>{account?.name ?? "—"}</span>
                                    </p>
                                </div>
                                <p
                                    className="text-sm font-bold flex-shrink-0"
                                    style={{ color: transaction.type === "expense" ? "#ef4444" : "#39b8a2" }}
                                >
                                    {transaction.type === "expense" ? "-" : "+"}
                                    {currencyFormatHelper(transaction.amount)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* New expense CTA */}
            <button
                type="button"
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
    );
}

function CategoryChip({
    label,
    isActive,
    onClick,
    color,
    icon,
}: Readonly<{
    label: string;
    isActive: boolean;
    onClick: () => void;
    color: string;
    icon: string;
}>) {
    const handleChipClick = () => {
        onClick();
    };

    return (
        <button
            type="button"
            onClick={handleChipClick}
            aria-pressed={isActive}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0 transition-all"
            style={{
                background: isActive ? color : `${color}20`,
                color: isActive ? "#fff" : "#dde8e6",
                border: `1px solid ${isActive ? color : "transparent"}`,
            }}
        >
            <span aria-hidden="true">{icon}</span>
            {label}
        </button>
    );
}
