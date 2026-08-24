"use client";

import { Plus, TrendingDown, TrendingUp } from "lucide-react";

import { calculateMonthlyExpenses, calculateMonthlyIncome, calculateTotalNet } from "src/shared/core/helpers/calculations.helper";
import { currencyFormatHelper } from "src/shared/core/helpers/format.helper";

import type { AccountEntity } from "src/features/accounts/core/domain/entities/account.entity";
import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

interface AccountsViewProps {
    accounts: AccountEntity[];
    transactions: TransactionEntity[];
}

export function AccountsView({ accounts, transactions }: AccountsViewProps) {
    const totalNet = calculateTotalNet(accounts);
    const totalIn = calculateMonthlyIncome(transactions);
    const totalOut = calculateMonthlyExpenses(transactions);

    return (
        <div className="flex flex-col gap-5 p-4 md:p-8 pb-6 animate-slide-up max-w-4xl mx-auto w-full">
            {/* Net worth card */}
            <div className="rounded-2xl p-5" style={{ background: "#1a5862", border: "1px solid rgba(38,160,155,0.25)" }}>
                <p className="text-xs font-medium mb-1" style={{ color: "#85c9c0" }}>
                    Patrimonio Neto
                </p>
                <p className="text-3xl font-bold mb-4" style={{ color: totalNet >= 0 ? "#39b8a2" : "#ef4444" }}>
                    {totalNet < 0 ? "-" : ""}
                    {currencyFormatHelper(totalNet)}
                </p>

                {/* Income / expenses row */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: "rgba(57,184,162,0.15)" }}
                        >
                            <TrendingUp size={14} color="#39b8a2" />
                        </div>
                        <div>
                            <p className="text-[10px]" style={{ color: "#85c9c0" }}>
                                Ingresos
                            </p>
                            <p className="text-sm font-bold" style={{ color: "#39b8a2" }}>
                                +{currencyFormatHelper(totalIn)}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: "rgba(239,68,68,0.15)" }}
                        >
                            <TrendingDown size={14} color="#ef4444" />
                        </div>
                        <div>
                            <p className="text-[10px]" style={{ color: "#85c9c0" }}>
                                Gastos
                            </p>
                            <p className="text-sm font-bold" style={{ color: "#ef4444" }}>
                                -{currencyFormatHelper(totalOut)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Accounts list */}
            <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white">Mis Cuentas</h2>
                <button
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors hover:bg-white/10"
                    style={{ border: "1px solid rgba(38,160,155,0.4)", color: "#39b8a2" }}
                >
                    <Plus size={12} />
                    Nueva
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {accounts.map((account) => {
                    const accountTxs = transactions.filter((t) => t.accountId === account.id);
                    const expenses = calculateMonthlyExpenses(accountTxs);
                    const income = calculateMonthlyIncome(accountTxs);
                    const isNeg = account.balance < 0;

                    return (
                        <div
                            key={account.id}
                            className="p-4 rounded-2xl"
                            style={{ background: "#1a5862", border: "1px solid rgba(38,160,155,0.15)" }}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                                    style={{ background: "rgba(38,160,155,0.2)" }}
                                    aria-hidden="true"
                                >
                                    {account.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-white">{account.name}</p>
                                </div>
                                <p className="text-lg font-bold" style={{ color: isNeg ? "#ef4444" : "#39b8a2" }}>
                                    {isNeg ? "-" : ""}
                                    {currencyFormatHelper(account.balance)}
                                </p>
                            </div>

                            {/* Mini stats */}
                            {accountTxs.length > 0 && (
                                <div className="flex gap-3 pt-3" style={{ borderTop: "1px solid rgba(38,160,155,0.15)" }}>
                                    <div className="flex items-center gap-1.5">
                                        <TrendingUp size={12} color="#39b8a2" />
                                        <span className="text-xs" style={{ color: "#85c9c0" }}>
                                            <span style={{ color: "#39b8a2" }}>+{currencyFormatHelper(income)}</span> ingresos
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <TrendingDown size={12} color="#ef4444" />
                                        <span className="text-xs" style={{ color: "#85c9c0" }}>
                                            <span style={{ color: "#ef4444" }}>-{currencyFormatHelper(expenses)}</span> gastos
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
