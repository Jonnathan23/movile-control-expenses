"use client";

import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, ChevronDown, X } from "lucide-react";

import { currencyFormatHelper } from "src/shared/core/helpers/format.helper";

import type { AccountEntity } from "src/features/accounts/core/domain/entities/account.entity";
import type { TransactionType } from "src/features/transactions/core/domain/enums/transaction.enum";

import { useBudgetContext } from "src/features/transactions/presentation/hooks/use-budget-context.hook";
import { useGetCategories } from "src/features/transactions/presentation/hooks/use-cases/categories/get-categories.hook";
import { useCreateTransaction } from "src/features/transactions/presentation/hooks/use-cases/transactions/create-transaction.hook";

interface NewExpenseViewProps {
    readonly accounts: AccountEntity[];

    readonly onClose: () => void;
}

const ISO_DATE_LENGTH = 10;
const MAX_DECIMALS = 2;
const TIME_STRING_LENGTH = 8;

export function NewExpenseView({ accounts, onClose }: NewExpenseViewProps) {
    const { dispatch } = useBudgetContext();
    const { executeMutation: createTransaction } = useCreateTransaction({ dispatch });
    const { data: categories = [] } = useGetCategories();

    const [txType, setTxType] = useState<TransactionType>("expense");
    const [selectedAccount, setAccount] = useState(accounts[0]?.id ?? "");
    const [amount, setAmount] = useState("");
    const [categoryId, setCategoryId] = useState<string>("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date().toISOString().slice(0, ISO_DATE_LENGTH));
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [error, setError] = useState("");

    const currentAccount = accounts.find((accountData) => accountData.id === selectedAccount);

    const handleAmountKeyClick = (key: string) => () => {
        if (key === "DEL") {
            setAmount((v) => v.slice(0, -1));
        } else if (key === "." && amount.includes(".")) {
            // no double decimal
        } else if (amount.split(".")[1]?.length >= MAX_DECIMALS) {
            // max 2 decimals
        } else {
            setAmount((v) => v + key);
        }
    };

    const handleSaveClick = () => {
        const num = Number.parseFloat(amount);
        if (!amount || Number.isNaN(num) || num <= 0) {
            setError("Ingresa un monto válido");
            return;
        }

        const selectedCategory = categories.find((c) => c.id === categoryId) ?? categories[0];

        if (!selectedCategory) {
            setError("Categoría inválida");
            return;
        }

        setError("");

        createTransaction({
            type: txType,
            amount: num,
            categoryId: selectedCategory.id,
            categoryName: selectedCategory.name,
            description: description ?? selectedCategory.name,
            accountId: selectedAccount,
            date: new Date(date + "T" + new Date().toTimeString().slice(0, TIME_STRING_LENGTH)),
        });

        onClose();
    };

    const handleTxTypeClick = (type: TransactionType) => () => {
        setTxType(type);
    };

    const handleAccountToggleClick = () => {
        setIsAccountOpen((v) => !v);
    };

    const handleAccountClick = (id: string) => () => {
        setAccount(id);
        setIsAccountOpen(false);
    };

    const handleCategoryClick = (id: string) => () => {
        setCategoryId(id);
    };

    const handleCloseClick = () => {
        onClose();
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.style.borderColor = "#26a09b";
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.style.borderColor = "rgba(38,160,155,0.25)";
    };

    const isExpense = txType === "expense";

    return (
        <div className="flex flex-col min-h-full animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-12 pb-4">
                <h2 className="text-lg font-bold text-white">{isExpense ? "Nuevo Gasto" : "Nuevo Ingreso"}</h2>
                <button
                    type="button"
                    onClick={handleCloseClick}
                    aria-label="Cerrar"
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                >
                    <X size={20} color="#dde8e6" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-32 space-y-5 hide-scrollbar">
                {/* Type toggle */}
                <div
                    className="flex p-1 rounded-2xl gap-1"
                    style={{ background: "#0a3240" }}
                    role="group"
                    aria-label="Tipo de transacción"
                >
                    {(["expense", "income"] as TransactionType[]).map((t) => (
                        <button
                            key={t}
                            type="button"
                            onClick={handleTxTypeClick(t)}
                            aria-pressed={txType === t}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
                            style={{
                                background: txType === t ? (t === "expense" ? "#ef4444" : "#26a09b") : "transparent",
                                color: txType === t ? "#fff" : "#85c9c0",
                            }}
                        >
                            {t === "expense" ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                            {t === "expense" ? "Gasto" : "Ingreso"}
                        </button>
                    ))}
                </div>

                {/* Account selector */}
                <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: "#85c9c0" }}>
                        Cuenta
                    </label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={handleAccountToggleClick}
                            className="w-full flex items-center justify-between p-4 rounded-2xl text-sm font-medium text-white transition-colors hover:brightness-110"
                            style={{ background: "#1a5862", border: "1px solid rgba(38,160,155,0.25)" }}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xl" aria-hidden="true">
                                    {currentAccount?.icon}
                                </span>
                                <div className="text-left">
                                    <p className="font-semibold text-white">{currentAccount?.name}</p>
                                    <p
                                        className="text-xs"
                                        style={{ color: currentAccount && currentAccount.balance >= 0 ? "#39b8a2" : "#ef4444" }}
                                    >
                                        {currentAccount ? currencyFormatHelper(currentAccount.balance) : "—"}
                                    </p>
                                </div>
                            </div>
                            <ChevronDown
                                size={16}
                                color="#85c9c0"
                                className={isAccountOpen ? "rotate-180 transition-transform" : "transition-transform"}
                            />
                        </button>

                        {isAccountOpen && (
                            <div
                                className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-10 shadow-2xl animate-slide-up"
                                style={{ background: "#0a3240", border: "1px solid rgba(38,160,155,0.3)" }}
                            >
                                {accounts.map((acc) => (
                                    <button
                                        key={acc.id}
                                        type="button"
                                        onClick={handleAccountClick(acc.id)}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-white/5"
                                        style={{ borderBottom: "1px solid rgba(38,160,155,0.1)" }}
                                    >
                                        <span className="text-xl" aria-hidden="true">
                                            {acc.icon}
                                        </span>
                                        <span className="flex-1 text-left text-white font-medium">{acc.name}</span>
                                        <span style={{ color: acc.balance >= 0 ? "#39b8a2" : "#ef4444" }}>
                                            {currencyFormatHelper(acc.balance)}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Amount display */}
                <div
                    className="rounded-2xl p-5 text-center"
                    style={{ background: "#1a5862", border: "1px solid rgba(38,160,155,0.2)" }}
                >
                    <label className="block text-xs font-medium mb-2" style={{ color: "#85c9c0" }}>
                        Monto
                    </label>
                    <p className="text-4xl font-bold" style={{ color: isExpense ? "#ef4444" : "#39b8a2" }}>
                        {amount ? `${isExpense ? "-" : "+"}$${amount}` : "$0.00"}
                    </p>
                    {error && (
                        <p className="text-xs mt-2" style={{ color: "#ef4444" }}>
                            {error}
                        </p>
                    )}
                </div>

                {/* Numeric keypad */}
                <div className="grid grid-cols-3 gap-2">
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "DEL"].map((key) => (
                        <button
                            key={key}
                            type="button"
                            onClick={handleAmountKeyClick(key)}
                            aria-label={key === "DEL" ? "Borrar" : key}
                            className="py-4 rounded-xl text-lg font-semibold transition-all active:scale-95 hover:brightness-110"
                            style={{
                                background: key === "DEL" ? "rgba(239,68,68,0.15)" : "#1a5862",
                                color: key === "DEL" ? "#ef4444" : "#fff",
                                border: "1px solid rgba(38,160,155,0.15)",
                            }}
                        >
                            {key === "DEL" ? "⌫" : key}
                        </button>
                    ))}
                </div>

                {/* Category selector */}
                <div>
                    <label className="block text-xs font-medium mb-3" style={{ color: "#85c9c0" }}>
                        Categoría
                    </label>
                    <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                        {categories.map((categoryItem) => {
                            const isSelected = categoryId
                                ? categoryId === categoryItem.id
                                : categories[0]?.id === categoryItem.id;
                            return (
                                <button
                                    key={categoryItem.id}
                                    type="button"
                                    onClick={handleCategoryClick(categoryItem.id)}
                                    aria-pressed={isSelected}
                                    className="flex flex-col items-center gap-1.5 flex-shrink-0 transition-all active:scale-95"
                                >
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                                        style={{
                                            background: isSelected ? categoryItem.color : `${categoryItem.color}25`,
                                            border: isSelected ? `2px solid ${categoryItem.color}` : "2px solid transparent",
                                            transition: "all 0.2s",
                                        }}
                                        aria-hidden="true"
                                    >
                                        {categoryItem.icon}
                                    </div>
                                    <span
                                        className="text-[10px] font-medium text-center w-12 truncate"
                                        style={{ color: isSelected ? "#fff" : "#85c9c0" }}
                                    >
                                        {categoryItem.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-xs font-medium mb-2" style={{ color: "#85c9c0" }}>
                        Descripción (opcional)
                    </label>
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Ej. Almuerzo con amigos"
                        className="w-full p-4 rounded-2xl text-sm text-white placeholder:text-[#85c9c0] outline-none transition-colors"
                        style={{
                            background: "#1a5862",
                            border: "1px solid rgba(38,160,155,0.25)",
                        }}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                </div>

                {/* Date */}
                <div>
                    <label htmlFor="tx-date" className="block text-xs font-medium mb-2" style={{ color: "#85c9c0" }}>
                        Fecha
                    </label>
                    <input
                        id="tx-date"
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        className="w-full p-4 rounded-2xl text-sm text-white outline-none transition-colors"
                        style={{
                            background: "#1a5862",
                            border: "1px solid rgba(38,160,155,0.25)",
                            colorScheme: "dark",
                        }}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                </div>
            </div>

            {/* Save button */}
            <div
                className="sticky bottom-0 px-5 pb-8 pt-4 mt-auto flex-shrink-0"
                style={{ background: "linear-gradient(to top, #0c3c46 70%, transparent)" }}
            >
                <button
                    type="button"
                    onClick={handleSaveClick}
                    className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all active:scale-[0.98] hover:brightness-110"
                    style={{
                        background: isExpense
                            ? "linear-gradient(135deg, #ef4444, #dc2626)"
                            : "linear-gradient(135deg, #39b8a2, #26a09b)",
                        boxShadow: isExpense ? "0 4px 20px rgba(239,68,68,0.35)" : "0 4px 20px rgba(38,160,155,0.35)",
                    }}
                >
                    {isExpense ? "Guardar Gasto" : "Guardar Ingreso"}
                </button>
            </div>
        </div>
    );
}
